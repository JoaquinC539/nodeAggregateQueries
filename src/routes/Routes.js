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
class Routes {
    constructor() {
        this.routes = express_1.default.Router();
        this.indexController = new IndexController_1.IndexController();
        this.AlmacenController = new AlmacenController_1.AlmacenController();
        this.DocumentoController = new PedidoController_1.PedidoController();
        this.routes.get('/', this.indexController.index);
        this.routes.get('/index', this.indexController.index);
        this.routes.get('/index/js', this.indexController.js);
        this.routes.get('/index/css', this.indexController.css);
        this.routes.get('/almacen', this.AlmacenController.getAlmacenes);
        this.routes.get('/pedido', this.DocumentoController.getPedidos);
    }
}
exports.Routes = Routes;
