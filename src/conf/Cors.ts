const allowedOrigins=require("./allowedOrigins/allowedOrigins.json")
export class Cors{
    public corsOptions:any;
    private allowedOrigins:Array<string>=allowedOrigins.allowedOrigins
    constructor(){
        this.setAllowedOrigins();
    }
    public setAllowedOrigins(){
        this.corsOptions={
            origin:function(origin:any,callback:any){
                if(this.allowedOrigins.indexOf(origin) !==-1 ||!origin){
                    callback(null,true);
                }else{
                    callback(new Error("Not allowed by CORS"))
                }
            }
        }
    }
}