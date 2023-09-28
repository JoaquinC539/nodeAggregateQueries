import { Request, Response } from "express";
import { DocumentoModel } from "../class/Documento";
import { PedidoService } from "../services/PedidoService";

export class PedidoController {
    private _pedidoService: PedidoService;

    constructor() {
        this._pedidoService = new PedidoService(DocumentoModel);
        
    }

    public getPedidos = async (req: Request, res: Response): Promise<void> => {
        this._pedidoService.getPedidos()
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json(error)
            });
    }
   
}

