import { DocumentoModel,Documento } from "../class/Documento";
import { PipelineStage } from "mongoose";


export class PedidoService{
    constructor(private documentoModel: typeof DocumentoModel){}

    public index(queryParam:{[key:string]:any}):Promise<Array<Documento>>{
            const query:Array<PipelineStage>=this.indexQuery(queryParam)
            return this.documentoModel.aggregate(query).exec();
    }
    public indexExport(queryParam:{[key:string]:any}):Promise<Array<Documento>>{
        const query:Array<PipelineStage>=this.pedidosQuery(queryParam);
        return this.documentoModel.aggregate(query).exec();
    }


    public pedidosQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        let query:Array<PipelineStage>=[];
            query.push({$match:{'_class':'Pedido'}});
            query.push({$match:{'estatus':'FINALIZADO'}})
            query.push({$lookup:{from:'proveedor',localField:'tienda',foreignField:'_id',as:'Tienda'}})
            query.push({$addFields:{'totalMXN':{$multiply:['$total','$tipoCambio']}}})
            query.push({$group:{
                '_id':'$_id',
                'total':{$first:'$total'},
                'tipoCambio':{$first:'$tipoCambio'},
                'totalMXN':{$first:'$totalMXN'},
                'tienda':{$addToSet:{'tienda':'$Tienda.nombre','clave':'$Tienda.clave'}}
            }});
            query.push({$unwind:{path:'$tienda',preserveNullAndEmptyArrays:false}})
            // query.push({$limit:3});
            query.push({$sort:{'_id':-1}});
            return query;
    }
    public indexQuery(queryParam:{[key:string]:any}){
        const query:Array<PipelineStage>=this.pedidosQuery(queryParam);
        if(queryParam.offset===undefined){
            queryParam.offset=0;
        }
        if(queryParam.max===undefined){
            queryParam.max=15;
        }
        query.push({$facet:{
            'results':[{$skip:Number(queryParam.offset)},{$limit:Number(queryParam.max)}],
            'count':[{$count:'count'}]
        }});
        return query

    }

}
