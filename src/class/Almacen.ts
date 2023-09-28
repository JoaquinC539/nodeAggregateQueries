import mongoose,{Schema,Document} from 'mongoose';
import { IDireccion,DireccionSchema,Direccion } from './Direccion';



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
    direccionObj?: Direccion;
    offset?: number;
    rfc?: string;
  
    constructor(data?: Partial<Almacen>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  }
  

  export const AlmacenModel=mongoose.model<IDireccion>("Almacen",AlmacenSchema,'almacen')


  