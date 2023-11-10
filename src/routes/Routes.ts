
import  express, { Router }  from "express";
import	{IndexController} from "../controllers/IndexController";
import { AlmacenController } from "../controllers/AlmacenController";
import { PedidoController } from "../controllers/PedidoController";
import { OrdenAbastoController } from "../controllers/OrdenAbastoController";
import { FacturaController } from "../controllers/FacturaController";
export class Routes{
    public routes:Router=express.Router();
    private indexController:IndexController=new IndexController();
    private AlmacenController:AlmacenController=new AlmacenController();
    private DocumentoController:PedidoController=new PedidoController();
    private OrdenAbastoController:OrdenAbastoController=new OrdenAbastoController();
    private FacturaController:FacturaController=new FacturaController();
    constructor(){
        this.routes.get('/',this.indexController.index);
        this.routes.get('/index',this.indexController.index);
        this.routes.get('/index/js',this.indexController.js);
        this.routes.get('/index/css',this.indexController.css);
        this.routes.get('/almacen',this.AlmacenController.index);
        this.routes.get('/almacen/index',this.AlmacenController.index);
        this.routes.post('/almacen',this.AlmacenController.save);
        this.routes.get('/almacen/:id',this.AlmacenController.get);
        this.routes.put('/almacen/:id?',this.AlmacenController.update);
        this.routes.get('/pedido',this.DocumentoController.getPedidos);
        this.routes.get('/pedido/index',this.DocumentoController.getPedidos);
        this.routes.get('/ordenAbasto/cuentasCobrar',this.OrdenAbastoController.getCuentasPorCobrar)
        this.routes.get('/factura',this.FacturaController.getIndexFacturas);
        this.routes.get('/factura/index',this.FacturaController.getIndexFacturas);
        
    }

}