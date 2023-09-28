import mongoose,{Schema,Document} from 'mongoose';
export interface IDocumento extends Document{

}

export const DocumentoSchema: Schema<IDocumento>=new Schema<IDocumento>({

},{
    collection:'documento'
});

export class Documento{
    

    constructor(data?:Partial<Documento>){
        if(data){
            Object.assign(this,data)
        }
    }
}

export const DocumentoModel=mongoose.model<IDocumento>("Documento",DocumentoSchema,'documento')