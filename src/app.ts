// const express=require("express")
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'
import { Routes } from './routes/Routes';

export class App{
    private express:any=express();
    private port:number | string | undefined=3500;
    private routes:Routes=new Routes();

    constructor(port?:number | string){
        this.port=port;
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use(bodyParser.json());
        this.express.use("/api",express.static(path.join(__dirname,'public')));
        this.express.use('/api',this.routes.routes);
        this.express.set('view engine','ejs');
        this.express.set('views',path.join(__dirname,'views'));
    }

    public getPort():number{
        return Number(this.port);
    }

    public serverCreate(port:number):Promise<unknown>{
        return new Promise<void>((resolve,reject)=>{
            try {
                this.express.listen(port,()=>{
                    console.log("Server listenting at localhost:"+port);
                    resolve();
                      }); 
            } catch (error) {
                reject(error);
            }
            });
    }
}