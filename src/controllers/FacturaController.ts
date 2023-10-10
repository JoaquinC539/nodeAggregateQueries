import { Request, Response } from "express";
import { Factura, FacturaModel } from "../class/Factura";
import { FacturaService } from "../services/FacturaService";
import { CsvExportService } from "../services/CsvExportService";



export class FacturaController {
    private _facturaServce:FacturaService
    private _csvExportService:CsvExportService

    constructor() {
        this._facturaServce=new FacturaService(FacturaModel)
        this._csvExportService=new CsvExportService()
    }

    public getIndexFacturas = async (req: Request, res: Response): Promise<void> => {
        // console.log(req.query)
       if(req.query.export==="true" || req.headers["content-type"]==="text/csv"){
            try {
                const facturas:Array<Factura>=await this._facturaServce.getFacturaIndexExport(req.query);
                const fileName:string="facturas.csv";
                const columns:Object={_id:"ID",estatus:"Estatus",tipo:"Tipo",fecha:"Fecha",folio:"Folio",
                moneda:"Moneda",total:"Total",cliente:'Cliente',serie:"Serie",
                razonSocial:"Razon Social",FormaDePago:"Forma de Pago",Tienda:"Tienda",totalTC:"Total x tipo Cambio"}
                const formateDate=(date:Date | string):string=>{
                    let datejs=new Date(date);
                    return datejs.toLocaleDateString("es-MX");
                }
                const formatters={fecha:formateDate}
                
                await this._csvExportService.exportCSV(res,columns,facturas,fileName,formatters)
                return
            } catch (error) {
                res.status(500).json({error:"Error in exporting to csv",err:error})
            }
        }
        const facturas:Factura=await this._facturaServce.getFacturaIndex(req.query);
        res.status(200).json(facturas)
    }
    
   
}

  

