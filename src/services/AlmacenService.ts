import { PipelineStage, Query } from "mongoose";
import {  Almacen, AlmacenModel } from "../class/Almacen";
import { Types } from "mongoose";

export class AlmacenService{
    private types:any=Types
    constructor(private almacenModel: typeof AlmacenModel){}
   public index(queryParam:{[key:string]:any}):Promise<any>{
        const query:Array<PipelineStage>=this.indexQuery(queryParam);
        return this.almacenModel.aggregate(query).exec();
    }
   public async indexExport(queryParam:{[key:string]:any}):Promise<any>{
        const query:Array<PipelineStage>=this.baseIndexQuery(queryParam);
        return this.almacenModel.aggregate(query).exec();
    }
    public indexQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        if(queryParam.offset===undefined){
            queryParam.offset=0;
        }
        if(queryParam.max===undefined){
            queryParam.max=15;
        }
        const query:Array<PipelineStage>=this.baseIndexQuery(queryParam);
        if(queryParam.offset!==undefined && queryParam.max!==undefined){
            query.push({$facet:{
                'results':[{$skip:Number(queryParam.offset)},{$limit:Number(queryParam.max)}],
                'count':[{$count:'count'}]
            }});
        }
        
        return query
    }
     public baseIndexQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        let query:Array<PipelineStage>=[];
            if(queryParam.id!==undefined && queryParam.id!=='' && queryParam.id!=="null"){
                if(isNaN(Number(queryParam.id))){
                    if(Types.ObjectId.isValid(queryParam.id)){
                        query.push({$match:{'_id':new Types.ObjectId(queryParam.id)}})
                    }
                }else{
                    query.push({$match:{'_id':Number(queryParam.id)}})
                }
            }
            if(queryParam.nombre!==undefined && queryParam.nombre!=='' && queryParam.nombre!=="null"){
                // query.push({$match:{'nombre':String(queryParam.nombre)}})
                query.push({$match:{'nombre':{$regex:queryParam.nombre,$options:'i'}}})
            }
            if(queryParam.activo!==undefined && queryParam.activo=="on" && queryParam.activo!=="null"){
                query.push({$match:{'activo':{$in:[true,false]}}})
            }else{
                query.push({$match:{'activo':{$eq:true}}});
            }
            query.push({$project:{
                '_id':1,
                'clave':1,
                'nombre':1,
                'direccion':1,
                'activo':1
            }})
            query.push({$sort:{'_id':-1}});
            return query;
    }
    public searchForId(id:any):Promise<any>{
        const query:Array<PipelineStage>=[];
        if(id!==undefined || id!==null){
            id=isNaN(Number(id)) ? new Types.ObjectId(id) : Number(id);
            query.push({$match:{'_id':id}});
        }
        return AlmacenModel.aggregate(query).exec();
    }
}