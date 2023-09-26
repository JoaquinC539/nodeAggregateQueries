import mongoose from "mongoose";

export class DbConf{
    private dbURI:string="";

    constructor(dbURI:string){
        this.dbURI=dbURI;
    }
    public async connectDB(){
        try {
            if(!this.dbURI || this.dbURI===""){
                    console.log("URI not valid");
                    return;
            }
            await mongoose.connect(this.dbURI)
            .then(()=>console.log("DB connection successful"))
            .catch((error)=>console.error(error));
        } catch (error) {
            console.log("error: ",error)
        }
    }
}