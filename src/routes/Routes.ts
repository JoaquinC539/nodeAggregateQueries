
import  express  from "express";
import	{IndexController} from "../controllers/IndexController";
import { AlmacenController } from "../controllers/AlmacenController";

export class Routes{
    public routes=express.Router();
    private indexController:IndexController=new IndexController();
    private AlmacenController:AlmacenController=new AlmacenController();
    constructor(){
        this.routes.get('/',this.indexController.index);
        this.routes.get('/index',this.indexController.index);
        this.routes.get('/index/js',this.indexController.js);
        this.routes.get('/index/css',this.indexController.css);
        this.routes.get('/almacen',this.AlmacenController.getAlmacenes)

    }

}