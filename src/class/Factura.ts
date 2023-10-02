import mongoose,{Schema,Document} from 'mongoose';
export interface IFactura extends Document{

}

export const FacturaSchema: Schema<IFactura>=new Schema<IFactura>({

},{
    collection:'factura'
});

export class Factura{
    

    constructor(data?:Partial<Factura>){
        if(data){
            Object.assign(this,data)
        }
    }
}

export const FacturaModel=mongoose.model<IFactura>("Factura",FacturaSchema,'factura')