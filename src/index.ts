require('dotenv').config();
import { DbConf } from "./conf/dbConf";
import { App } from "./app";

export class Index{
    public port:number | string =3500;
    public app:App=new App();
    public dbCon:DbConf=new DbConf();

    constructor(port:number | string){
        this.port=port;
        this.app=new App(port);
        this.dbCon=new DbConf(process.env.DBURI);
    }

    public getPort():number{
        return Number(this.port);
    }

    public connect(){
        this.app.serverCreate(this.getPort())
        .then(()=>{
            this.dbCon.connectDB();
        })
        .catch((error)=>{console.log(error)})
    }
}

const index:Index=new Index(Number(process.env.PORT));
index.connect()



