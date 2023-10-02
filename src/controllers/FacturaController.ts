import { Request, Response } from "express";
import { FacturaModel } from "../class/Factura";
import { FacturaService } from "../services/FacturaService";


export class FacturaController {
    private _facturaServce:FacturaService

    constructor() {
        this._facturaServce=new FacturaService(FacturaModel)
        
    }

    public getCuentasPorCobrar = async (req: Request, res: Response): Promise<void> => {
        
    }
   
}

