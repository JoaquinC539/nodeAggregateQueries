
import  express  from "express";
import	{IndexController} from "../controllers/IndexController";

export class Routes{
    public routes=express.Router();
    private indexController:IndexController=new IndexController();
    constructor(){
        this.routes.get('/',this.indexController.index)
        this.routes.get('/index',this.indexController.index)
        this.routes.get('/index/js',this.indexController.js)
        this.routes.get('/index/css',this.indexController.css)
    }

}