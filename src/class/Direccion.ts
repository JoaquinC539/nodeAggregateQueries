import mongoose,{Schema,Document} from 'mongoose';

export interface IDireccion extends Document {
    calle?: string;
    noExterior?: string;
    noInterior?: string;
    codigoPostal?: string;
    telefono?: string;
    pais?: string;
    colonia?: string;
    municipio?: string;
    ciudad?: string;
    estado?: string;
    referencias?: string;
    nombre?: string;
    instruccionesEntrega?: string;
    isDefault?: boolean;
    fechaBaja?: Date;
  }

  export const DireccionSchema: Schema<IDireccion> = new Schema<IDireccion>({
    calle: String,
    noExterior: String,
    noInterior: String,
    codigoPostal: String,
    telefono: String,
    pais: String,
    colonia: String,
    municipio: String,
    ciudad: String,
    estado: String,
    referencias: String,
    nombre: String,
    instruccionesEntrega: String,
    isDefault: Boolean,
    fechaBaja: Date,
  });

  export class Direccion {
    calle?: string;
    noExterior?: string;
    noInterior?: string;
    codigoPostal?: string;
    telefono?: string;
    pais?: string;
    colonia?: string;
    municipio?: string;
    ciudad?: string;
    estado?: string;
    referencias?: string;
    nombre?: string;
    instruccionesEntrega?: string;
    isDefault?: boolean;
    fechaBaja?: Date;
  
    constructor(data?: Partial<Direccion>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  }
  

export const DireccionModel=mongoose.model<IDireccion>("Direccion",DireccionSchema,'direccion');