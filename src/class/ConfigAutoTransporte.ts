import  { Schema,  model} from "mongoose";



export class ConfigAutoTransporte  {
    public _id?:any
    public clave?:string 
    public nombre?:string 
    public Schema=new Schema({
    _id:{type:Schema.Types.Mixed},
    clave:String,
    nombre:String
    })
    constructor(data?:Partial<ConfigAutoTransporte>){
        if(data){
            Object.assign(this,data)
        }
    }
    toJSON(){
        return {
            _id: this._id,
            clave: this.clave,
            nombre: this.nombre
          };
    }
}


export const ConfigAutoTransporteModel=model('ConfigAutoTransporte',new ConfigAutoTransporte().Schema,'configAutotransporte')

