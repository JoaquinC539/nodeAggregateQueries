import { FacturaModel,Factura } from "../class/Factura";
import { PipelineStage } from "mongoose";


export class FacturaService{
    constructor(private facturaModel: typeof FacturaModel){}

    public getCuentasCobrar():Promise<Array<Factura>>{
            const query:Array<PipelineStage>=this.buildCuentasCobrarQuery()
            return this.facturaModel.aggregate(query).exec();
    }

    public buildCuentasCobrarQuery():Array<PipelineStage>{
        let query:Array<PipelineStage>=[];
            
            return query;
    }

}
