import { Request,Response } from "express"
import express from 'express';
import  path  from "path";
import fs from 'fs';
export class IndexController{
    private express:any;
    constructor(expressInstance:any){
        this.express=expressInstance;
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