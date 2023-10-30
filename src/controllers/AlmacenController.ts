import { Request,Response } from "express";
import { Almacen, AlmacenModel } from "../class/Almacen";
import { PipelineStage } from "mongoose";
import { AlmacenService } from "../services/AlmacenService";
import { CsvExportService } from "../services/CsvExportService";

export class AlmacenController{
    private _almacen:AlmacenService;
    private _csv:CsvExportService
    constructor(){
        this._almacen=new AlmacenService(AlmacenModel);
        this._csv=new CsvExportService();
    }
    public index =async (req:Request,res:Response):Promise<void>=>{
            if(req.query.export==='true' || req.headers["content-type"]==="text/csv"){
                try {
                    const almacenes:Array<Almacen>= await this._almacen.indexExport(req.query);
                    const fileName:string= await "almacen.csv";
                    const columns:Object= await {_id:'ID',clave:'Clave',nombre:"Nombre"};
                    await this._csv.exportCSV(res,columns,almacenes,fileName);
                    return;
                }
            catch (error) {
                res.status(500).json(error)
            }
        }
        const almacenes:Array<Almacen>= await this._almacen.index(req.query);
                res.status(200).json(almacenes);
    }

}