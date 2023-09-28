import { Request,Response } from "express";
import { AlmacenModel,IAlmacen } from "../class/Almacen";

export class AlmacenController{
    
    constructor(expressInstance?:any){
        
    }
    public async getAlmacenes(req:Request,res:Response){
        try {
            // const almacen :Array<IAlmacen>=await AlmacenModel.find();
            async function Query(){
                let query:Array<any>=[]
                query.push({$match:{'activo':{$eq:true}}});
                query.push({$group:{
                    '_id':'$_id',
                    'clave':{$first:'$clave'},
                    'activo':{$first:'$activo'}
                }});
                query.push({$sort:{'_id':-1}});
                return await AlmacenModel.aggregate(query).exec();
            }
            const almacenes=await Query();
            console.log(almacenes.length)
            res.status(200).json(almacenes);
            
        } catch (error) {
            res.status(500).json(error)
        }
    }
}