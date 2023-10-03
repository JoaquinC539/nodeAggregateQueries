import fs from 'fs';
import {stringify} from 'csv';
import path from 'path';
import { Request, Response } from "express";



export class CsvExportService{
    constructor(){
    }

    public async exportCSV(res:Response,columns:any,data:Array<Object>,fileName:string,formatters?:Object):Promise<void>{
        try {
            res.setHeader('Content-Type', 'text/csv');
            const writeCSV= await this.writeCSV(columns,data,fileName,formatters);
            await res.status(200).download(writeCSV,fileName,(error)=>{
                if(error){
                    res.status(500).json(error);
                }else{
                    fs.unlinkSync(writeCSV);
                }
            });
            return;
        } catch (error) {
            res.status(500).json(error)
        }
        

        return
    }

    public async writeCSV(columns:any,data:Array<any>,fileName:string,formatters?:any):Promise<string>{
        return new Promise<string>((resolve,reject)=>{
            const stringifier=stringify({header:true,columns});
            const writableStream=fs.createWriteStream(fileName);
            stringifier.pipe(writableStream);
            stringifier.on('end',()=>{
                const pathString:string=path.join(__dirname,'..','..',fileName)
                resolve(pathString);
            });
            stringifier.on('error',(error)=>{
                reject(error);
            });
            let keys:Array<string>=[]
            if(formatters){
                keys=Object.keys(formatters)
            }
            try {
                for(const row of data){
                    if(keys.length>0){
                        const dataKeys:Array<string>=Object.keys(row);
                        dataKeys.forEach((ele)=>{
                            const foundKey=keys.find((key)=>key===ele)
                            if(foundKey){
                                const formatter=formatters[foundKey];
                                row[foundKey]=formatter(row[foundKey]);
                            }
                        });
                    }
                    console.log(row)
                    stringifier.write(row)
                } 
            } catch (error) {
                console.log(error)
            }
            stringifier.end();
            return
        });
    }
}