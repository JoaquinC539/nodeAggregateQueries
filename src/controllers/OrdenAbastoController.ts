import { Request, Response } from "express";
import { OrdenAbastoModel } from "../class/OrdenAbasto";
import { FacturaModel } from "../class/Factura";
import { OrdenAbastoService } from "../services/OrdenAbastoService";


export class OrdenAbastoController {
    private _ordenAbastoServce:OrdenAbastoService

    constructor() {
        this._ordenAbastoServce=new OrdenAbastoService(OrdenAbastoModel,FacturaModel)
        
    }

    public getCuentasPorCobrar = async (req: Request, res: Response): Promise<void> => {
        this._ordenAbastoServce.getCuentasCobrar()
        .then((response)=>{
            console.log(response.length)
            // res.status(200).json({test:'test'});
            res.status(200).json(response);
        })
        .catch((error)=>{
            res.status(500).json(error);
        })
         return;
    }
   
}

