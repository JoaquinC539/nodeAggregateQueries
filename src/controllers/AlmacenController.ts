import { Request,Response } from "express";
import { Almacen, AlmacenModel } from "../class/Almacen";
import { PipelineStage } from "mongoose";

export class AlmacenController{
    
    constructor(expressInstance?:any){
        
    }
    public getAlmacenes =async (req:Request,res:Response):Promise<void>=>{
        try {
            // const almacen :Array<IAlmacen>=await AlmacenModel.find();
            async function Query():Promise<Almacen[]>{
                let query:Array<PipelineStage>=[]
                query.push({$match:{'activo':{$eq:true}}});
                query.push({$group:{
                    '_id':'$_id',
                    'clave':{$first:'$clave'},
                    'nombre':{$first:'$nombre'},
                    'activo':{$first:'$activo'}
                }});
                query.push({$sort:{'_id':-1}});
                return await AlmacenModel.aggregate(query).exec();
            }
            const almacenes=await Query();
            res.status(200).json(almacenes);
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}