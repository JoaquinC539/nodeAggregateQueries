import { Request, Response } from "express";
import { DocumentoModel } from "../class/Documento";
import { PedidoService } from "../services/PedidoService";
import { CsvExportService } from "../services/CsvExportService";

export class PedidoController {
    private _pedidoService: PedidoService;
    private _csv:CsvExportService;

    constructor() {
        this._pedidoService = new PedidoService(DocumentoModel);
        this._csv=new CsvExportService
        
    }

    public getPedidos = async (req: Request, res: Response): Promise<void> => {
        try {
            if(req.query.export==="true"){
                this._pedidoService.indexExport(req.query)
                .then((response)=>{
                    const fileName="Pedidos.csv";
                    const columns={_id:"Id",total:"Total",tipoCambio:"Tipo de Cambio",tienda:"Tienda",totalMXN:'TotalMXN'}
                    const tiendaFormatter=(tienda:{[key:string]:any}):string=>{
                        const result=tienda.tienda[0];
                        return result;
                    }
                    const formatters={tienda:tiendaFormatter}
                    this._csv.exportCSV(res,columns,response,fileName,formatters);
                })
                
            }else{
                this._pedidoService.index(req.query)
                .then((response) => {
                    res.status(200).json(response);
                })
                .catch((error) => {
                    res.status(500).json(error)
                });
            } 
        } catch (error) {
            res.status(500).json(error);
        }
        
        
    }
   
}

