import  {  Schema,  model, Document} from "mongoose";
import { ConfigAutoTransporte } from "./ConfigAutoTransporte";

export interface IAutoTransporte {
    _id?: any;
    anioModeloVM?:string;
     aseguraRespCivil?:string;
     clave?:string;
     configVehicular?:ConfigAutoTransporte;
     nombre?:string;
     numPermisoSCT?:string;
     permSCT?:string;
     placaVM?:String;
     polizaRespCivil?:string;
}


const schema =new Schema({
    _id: Schema.Types.Mixed,
  anioModeloVM: String,
  aseguraRespCivil: String,
  clave: String,
  configVehicular: {type:Schema.Types.Mixed,ref:'ConfigAutoTransporte'},  
  nombre: String,
  numPermisoSCT: String,
  permSCT: String,
  placaVM: String,
  polizaRespCivil: String
});

export const AutoTransporte=model<IAutoTransporte>('AutoTransporte',schema,'autoTransporte');





  


