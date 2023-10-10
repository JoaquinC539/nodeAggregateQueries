import { FacturaModel,Factura } from "../class/Factura";
import { PipelineStage } from "mongoose";


export class FacturaService{
    constructor(private facturaModel: typeof FacturaModel){}

    public getFacturaIndex(queryParams:{[key:string]:any}):Promise<Array<Factura>>{
            const query:Array<PipelineStage>=this.buildFacturaIndexQuery(queryParams)
            return this.facturaModel.aggregate(query).exec();
    }
    public getFacturaIndexExport(queryParams:{[key:string]:any}):Promise<Array<Factura>>{
        const query:Array<PipelineStage>=this.buildFacturaBaseQuery(queryParams)
        return this.facturaModel.aggregate(query).exec();
}

    public buildFacturaIndexQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        if(queryParam.offset===undefined){
            queryParam.offset=0;
        }
        if(queryParam.max===undefined){
            queryParam.max=15;
        }
        let query:Array<PipelineStage>=this.buildFacturaBaseQuery(queryParam);
            query.push({$facet:{
                'results':[{$skip:Number(queryParam.offset)},{$limit:Number(queryParam.max)}],
                'count':[{$count:'count'}]
            }});
            return query;
    }
    
    public buildFacturaBaseQuery(queryParam:{[key:string]:any}):Array<PipelineStage>{
        let query:Array<PipelineStage>=[];
        query.push({$match:{'_class':{$exists:false}}});
        query.push({$sort:{'_id':-1}});
        query.push({$match:{'estatus':'TIMBRADA'}});
        query.push({$lookup:{from:'proveedor',localField:'cliente',foreignField:'_id',as:'Cliente'}});
        query.push({$lookup:{from:'serie',localField:'serie',foreignField:'_id',as:'Serie'}});
        query.push({$unwind:'$documentos'});
        query.push({$lookup:{from:'documento',localField:'documentos',foreignField:'_id',as:'Documento'}});
        query.push({$lookup:{from:'formaDePago',localField:'formaDePago',foreignField:'_id',as:'FormaDePago'}});
        query.push({$lookup:{from:'proveedor',localField:'tienda',foreignField:'_id',as:'Tienda'}});
            query.push({$project:{
                "_id":1,
                "estatus":1,
                "cliente":{$arrayElemAt:["$Cliente.nombre",0]},
                "tipo":"Factura",
                'serie':{$arrayElemAt:['$Serie.nombre',0]},
                "folio":1,
                "razonSocial":{$arrayElemAt:['$Documento.datosFacturacionId',0]},
                "formaDePago":{$arrayElemAt:['$FormaDePago.nombre',0]},
                "fecha":1,
                "moneda":1,
                "tienda":{$arrayElemAt:['$Tienda.nombre',0]},
                "total":1,
                "totalTC":{$multiply:['$total','$tipoCambio']}
            }});
            return query;
    }


}
