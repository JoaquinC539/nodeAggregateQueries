import { PipelineStage } from "mongoose";
import { Almacen, AlmacenModel } from "../class/Almacen";

export class AlmacenService{
    constructor(private almacenModel: typeof AlmacenModel){}
   public index(queryParam:{[key:string]:any}){
        const query:Array<PipelineStage>=this.indexQuery(queryParam);
        return this.almacenModel.aggregate(query).exec();
    }
   public async indexExport(queryParam:{[key:string]:any}){
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
        query.push({$facet:{
            'results':[{$skip:Number(queryParam.offset)},{$limit:Number(queryParam.max)}],
            'count':[{$count:'count'}]
        }});
        return query
    }
     public baseIndexQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        let query:Array<PipelineStage>=[]
            query.push({$match:{'activo':{$eq:true}}});
            query.push({$group:{
                '_id':'$_id',
                'clave':{$first:'$clave'},
                'nombre':{$first:'$nombre'},
                
            }});
            query.push({$sort:{'_id':-1}});
            return query;
    }
}