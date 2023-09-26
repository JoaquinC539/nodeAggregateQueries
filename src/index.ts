require('dotenv').config();
import { connect } from "mongoose";
import { DbConf } from "./conf/dbConf";

export class Index{
    private port:number | string =3500;

    constructor(port:number | string){
        this.port=port;
    }

    public getPort():number{
        return Number(this.port);
    }

    public connectDB(){
        const dbCon :DbConf=new DbConf(String(process.env.DBURI));
        dbCon.connectDB()
    }
}

const index:Index=new Index(Number(process.env.PORT));
index.connectDB()



