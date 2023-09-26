// const express=require("express")
import express from 'express';
import bodyParser from 'body-parser';

export class App{
    private express:any=express();
    private port:number | string | undefined=3500;

    constructor(port?:number | string){
        this.port=port;
        this.express.use(bodyParser.urlencoded({extended:false}));
        this.express.use(bodyParser.json());
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