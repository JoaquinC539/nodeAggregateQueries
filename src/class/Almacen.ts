import mongoose,{Schema,Document, Types,} from 'mongoose';
import { IDireccion,DireccionSchema } from './Direccion';
import { ObjectId } from 'mongodb';



export interface IAlmacen extends Document{
    nombre?: string;
  clave?: string;
  activo?: boolean;
  inventarioNegativo?: boolean;
  noVenta?: boolean;
  direccion?: string;
  direccionObj?: IDireccion;
  offset?: number;
  rfc?: string;
}

export const AlmacenSchema: Schema<IAlmacen> = new Schema<IAlmacen>({
    _id:{type:Schema.Types.Mixed},
    nombre: String,
    clave: String,
    activo: Boolean,
    inventarioNegativo: Boolean,
    noVenta: Boolean,
    direccion: String,
    direccionObj: DireccionSchema, 
    offset: Number,
    rfc: String,
  },{
    collection:'almacen'
  }
  );

  export class Almacen {
    nombre?: string;
    clave?: string;
    activo?: boolean;
    inventarioNegativo?: boolean;
    noVenta?: boolean;
    direccion?: string;
    direccionObj?: IDireccion;
    offset?: number;
    rfc?: string;
  
    constructor(data?: Partial<Almacen>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  }
  

  export const AlmacenModel=mongoose.model<IAlmacen>("Almacen",AlmacenSchema,'almacen');


  