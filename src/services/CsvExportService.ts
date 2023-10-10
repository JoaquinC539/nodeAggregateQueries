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
            res.setHeader(`Content-Disposition`,`attachment:filename=${fileName}`);
            const writeCSV= await this.writeCSV(columns,data,fileName,formatters);
        //     await setTimeout(()=>{
        //          res.status(200).download(writeCSV,fileName,(error)=>{
        //             if(error){
        //                 fs.unlinkSync(writeCSV);
        //                 res.status(500).json(error);
        //             }else{
        //                 fs.unlinkSync(writeCSV);
        //             }
        //         });
        //     },1000);
        // } catch (error) {
        //     res.status(500).json(error)
        // }
       await res.status(200).download(writeCSV, fileName, (error) => {
            if (error) {
              fs.unlinkSync(writeCSV);
              res.status(500).json(error);
            } else {
              fs.unlinkSync(writeCSV);
            }
          });
        } catch (error) {
          res.status(500).json(error);
        }
        return
    }

    public async writeCSV(columns:any,data:Array<any>,fileName:string,formatters?:any):Promise<string>{
        return new  Promise<string>(async (resolve,reject) =>{
            const stringifier= await stringify({header:true,columns});
            const writableStream=await fs.createWriteStream(fileName,{encoding:'utf-8',flags:'a'});
            stringifier.pipe(writableStream);
            stringifier.on('finish',()=>{
                const pathString:string=path.join(__dirname,'..','..',fileName);
                resolve(pathString);
            })
            stringifier.on('error',(error)=>{
                console.log(error);
                reject(error);
            });
            let keys:Array<string>=[]
            if(formatters){
                keys=Object.keys(formatters)
            }
            try {
                if(formatters){
                    for(let i=0;i<data.length;i++){
                        let row=data[i];
                        row=this.modifyRow(row,formatters);
                        if (!stringifier.write(row)) {
                            await new Promise(resolve => stringifier.once('drain', resolve));
                        }
                        if(i===data.length-1){
                            setTimeout(()=>{
                                stringifier.end();
                            },500)
                            
                        }
                    }
                }else{
                    for(let i=0;i<=data.length;i++){
                        let row=data[i];
                        if(i!==data.length){
                            if (!stringifier.write(row)) {
                                await new Promise(resolve => stringifier.once('drain', resolve));
                              }
                        }
                        if(i===data.length){
                            console.log(" i=data")
                            setTimeout(()=>{
                                stringifier.end();
                            },500);
                        }
                      }
                }
            } catch (error) {
                console.log(error)
            }
        });
    }
    private modifyRow(row:{[key:string]:any},formatters:{[key:string]:Function}){
        let keys:Array<string>=[];
        keys=Object.keys(formatters);
        if(keys.length>0){
            const dataKeys:Array<string>=Object.keys(row);
            dataKeys.forEach((ele)=>{
                const foundKey=keys.find((key)=>key===ele)
                if(foundKey){
                    const formatter=formatters[foundKey];
                    row[foundKey]=formatter(row[foundKey]);
                }
            });
            return row;
        }else{
            return row;
        }
        
        
    }
}