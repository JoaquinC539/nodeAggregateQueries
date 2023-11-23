import  { Request,Response, Router } from "express";
import { ConfigAutoTransporte, ConfigAutoTransporteModel } from "./ConfigAutoTransporte";
import {  Document, Types } from "mongoose";
import {  AutoTransporteJoi, ConfigAutoTransporteJoi } from "../Joi/TransporteJoi";
import {   AutoTransporte, IAutoTransporte, } from "./AutoTransporte";

export class TransporteController{
    public transportRouter:Router=Router();
    constructor(){
        this.transportRouter.get('/configTransporte',this.indexConfig);
        this.transportRouter.get('/configTransporte/',this.indexConfig);
        this.transportRouter.get('/configTransporte/:id',this.getConfig);
        this.transportRouter.post('/configTransporte',this.saveConfig);
        this.transportRouter.put('/configTransporte/:id',this.updateConfig);
        this.transportRouter.get('/autoTransporte',this.indexAutoT);
        this.transportRouter.get('/autoTransporte/',this.indexAutoT);
        this.transportRouter.get('/autoTransporte/:id',this.getAutoT);
        this.transportRouter.post('/autoTransporte',this.saveAutot);
        this.transportRouter.put('/autoTransporte/:id',this.updateAutoT);
    }
    public indexConfig=(req:Request,res:Response):void=>{
        ConfigAutoTransporteModel.find().exec()
        .then((data:Array<any>)=>{
            res.status(200).json(data);
        })
        .catch((error)=>{
            res.status(500).json(error);
        })      
    }
    public getConfig=(req:Request,res:Response):void=>{
        const id= isNaN(Number(req.params.id))? new Types.ObjectId(req.params.id) : Number(req.params.id)
        ConfigAutoTransporteModel.findById(id).exec()
        .then((data:any)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(500).json(error)
        });
    }
    public saveConfig=(req:Request,res:Response):void=>{
        try {
            if(!req.body){
                res.status(400).json("No body data");
                return;
            }
            const {error}=ConfigAutoTransporteJoi.validate(req.body);
            if(error){res.status(400).json(error);return;}
            const conf:ConfigAutoTransporte = new ConfigAutoTransporte(req.body);
            if(req.body.clave){
                conf.clave=this.clavificar(req.body.clave);
            }else{
                conf.clave=this.clavificar(req.body.nombre);
            }
            conf._id=new Types.ObjectId();
            new ConfigAutoTransporteModel(conf).save();
            res.status(200).json(conf);
        } catch (error) {
            res.status(500).json({'error':error})
        }
    }

    public updateConfig=(req:Request,res:Response):void=>{
        try {
            if(!req.body){
                res.status(400).json("No body data");
                return;
            }
        const id= this.idParse(req.params.id)
        ConfigAutoTransporteModel.findByIdAndUpdate(id,req.body,{returnDocument:'after'}).exec()
        .then((response)=>{
            res.status(200).json(response);
        })
        .catch((error)=>{
            res.status(500).json(error)
        });
        } catch (error) {
            res.status(500).json({'error':error})
        }
    }

    public indexAutoT=(req:Request,res:Response):void=>{
        AutoTransporte.find().exec()
        .then((data:IAutoTransporte[])=>{
            res.status(200).send(data)
        })
        .catch((error:Error)=>{
            res.status(500).send(error)
        })
    }
    public getAutoT=(req:Request,res:Response):void=>{
        AutoTransporte.findById(this.idParse(req.params.id)).exec()
        .then((data:IAutoTransporte|null)=>{
            res.status(200).send(data)
        })
        .catch((error)=>{
            res.status(500).send(error)
        })
        
    }
    

    public saveAutot=async (req:Request,res:Response):Promise<void>=>{
        const {error}=AutoTransporteJoi.validate(req.body)
        if(error){res.status(400).send(error);return;}
        try {
            const autoT=new AutoTransporte(req.body)
            autoT.configVehicular=await ConfigAutoTransporteModel.findById(this.idParse(req.body.configVehicular)).exec() as unknown as ConfigAutoTransporte;
            autoT._id=new Types.ObjectId();
            autoT.save();
            res.status(200).send(autoT);
        } catch (error) {
            res.status(500).send(error);
            console.debug(error)
        }
    }

    public updateAutoT=(req:Request,res:Response):void=>{
        try {
            if(!req.body){
                res.status(400).json({error:"Not body data"});
                return;
            }
            AutoTransporte.findByIdAndUpdate(this.idParse(req.params.id),req.body,{returnDocument:'after'}).exec()
            .then((data:IAutoTransporte|null)=>{
                if(data){
                    res.status(200).send(data);
                }else{
                    res.status(404).json({error:"Not found"});
                }
            })
        } catch (error) {
            res.status(500).send(error);
            console.debug(error)
        }
    }

    public clavificar(nombre:string):string{
        nombre=nombre.normalize('NFD');
        nombre=nombre.replace(/[\u0300-\u036f]/g,"");
        return nombre;
    }
    public idParse(value:string):Types.ObjectId|number{
        return isNaN(Number(value))?new Types.ObjectId(value):Number(value);
    }
}