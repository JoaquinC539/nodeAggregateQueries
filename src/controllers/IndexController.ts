import { Request,Response } from "express";
import  path  from "path";

export class IndexController{
    
    constructor(expressInstance?:any){
        
    }

    public index(req:Request,res:Response){
        const name:string="John";
        const admin:boolean=false
        const items:Array<string>=["pizza","almonds","sugar","tomatoes","Bananas"]
        res.render('index/index',{name,admin,items});
        // res.sendFile(path.join(__dirname,'..','views','index','index.html'));
    }
    public js(req:Request,res:Response){
        res.sendFile(path.join(__dirname,'..','views','index','index.js'));
        // res.sendFile('./index/index.js')
    }
    public css(req:Request,res:Response){
        res.sendFile(path.join(__dirname,'..','views','index','index.css'));
    }
}