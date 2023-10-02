import mongoose,{Schema,Document} from 'mongoose';
export interface IOrdenAbasto extends Document{

}

export const OrdenAbastoSchema: Schema<IOrdenAbasto>=new Schema<IOrdenAbasto>({

},{
    collection:'documento'
});

export class OrdenAbasto{
    

    constructor(data?:Partial<OrdenAbasto>){
        if(data){
            Object.assign(this,data)
        }
    }
}

export const OrdenAbastoModel=mongoose.model<IOrdenAbasto>("OrdenAbasto",OrdenAbastoSchema,'documento')