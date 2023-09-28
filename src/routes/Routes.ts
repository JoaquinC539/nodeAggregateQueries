
import  express, { Router }  from "express";
import	{IndexController} from "../controllers/IndexController";
import { AlmacenController } from "../controllers/AlmacenController";
import { PedidoController } from "../controllers/PedidoController";
export class Routes{
    public routes:Router=express.Router();
    private indexController:IndexController=new IndexController();
    private AlmacenController:AlmacenController=new AlmacenController();
    private DocumentoController:PedidoController=new PedidoController();
    constructor(){
        this.routes.get('/',this.indexController.index);
        this.routes.get('/index',this.indexController.index);
        this.routes.get('/index/js',this.indexController.js);
        this.routes.get('/index/css',this.indexController.css);
        this.routes.get('/almacen',this.AlmacenController.getAlmacenes);
        this.routes.get('/pedido',this.DocumentoController.getPedidos);
        
    }

}