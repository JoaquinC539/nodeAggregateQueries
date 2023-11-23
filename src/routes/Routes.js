"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const IndexController_1 = require("../controllers/IndexController");
const AlmacenController_1 = require("../controllers/AlmacenController");
const PedidoController_1 = require("../controllers/PedidoController");
const OrdenAbastoController_1 = require("../controllers/OrdenAbastoController");
const FacturaController_1 = require("../controllers/FacturaController");
const TransporteController_1 = require("../class/TransporteController");
class Routes {
    constructor() {
        this.routes = express_1.default.Router();
        this.indexController = new IndexController_1.IndexController();
        this.AlmacenController = new AlmacenController_1.AlmacenController();
        this.DocumentoController = new PedidoController_1.PedidoController();
        this.OrdenAbastoController = new OrdenAbastoController_1.OrdenAbastoController();
        this.FacturaController = new FacturaController_1.FacturaController();
        this.TransporteController = new TransporteController_1.TransporteController();
        this.routes.get('/', this.indexController.index);
        this.routes.get('/index', this.indexController.index);
        this.routes.get('/index/js', this.indexController.js);
        this.routes.get('/index/css', this.indexController.css);
        this.routes.get('/almacen', this.AlmacenController.index);
        this.routes.get('/almacen/index', this.AlmacenController.index);
        this.routes.post('/almacen', this.AlmacenController.save);
        this.routes.get('/almacen/:id', this.AlmacenController.get);
        this.routes.put('/almacen/:id?', this.AlmacenController.update);
        this.routes.get('/pedido', this.DocumentoController.getPedidos);
        this.routes.get('/pedido/index', this.DocumentoController.getPedidos);
        this.routes.get('/ordenAbasto/cuentasCobrar', this.OrdenAbastoController.getCuentasPorCobrar);
        this.routes.get('/factura', this.FacturaController.getIndexFacturas);
        this.routes.get('/factura/index', this.FacturaController.getIndexFacturas);
        this.routes.use('/', this.TransporteController.transportRouter);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map