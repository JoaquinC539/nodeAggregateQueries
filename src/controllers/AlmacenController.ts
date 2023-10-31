import e, { Request,Response } from "express";
import { Almacen, AlmacenModel, AlmacenSchema } from "../class/Almacen";
import { AlmacenService } from "../services/AlmacenService";
import { CsvExportService } from "../services/CsvExportService";
import { AlmacenJoi } from "../Joi/AlmacenJoi";

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
    public save=async(req:Request,res:Response):Promise<void>=>{
        console.log(req.body)
        try {
            if(!req.body){
                res.status(400).json({error:'Empty request'});
                return;
            }else{
                const {error}=AlmacenJoi.validate(req.body);
                if(error){res.status(400).json({error:"Error in almacen creation check the error",description:error.details[0].message});return;}
                const clave:string=req.body.nombre.trim().toLowerCase();
                const almacen=new Almacen({
                    nombre:req.body.nombre,
                    clave:clave,
                    inventarioNegativo:(req.body.inventarioNegativo?req.body.inventarioNegativo:false),
                    noVenta:req.body.noVenta?req.body.noVenta:false,
                    activo:(req.body.activo?req.body.activo:true),
                    direccion:req.body.direccion,
                    rfc:req.body.rfc?req.body.rfc:null,
                });
                const almacenModel=new AlmacenModel(almacen);
                almacenModel.save();
                res.status(200).json(almacen);
            }

            
        } catch (error) {
            res.status(500).json(error);
        }
    }

}