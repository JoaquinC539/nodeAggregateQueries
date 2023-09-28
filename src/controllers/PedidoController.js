"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoController = void 0;
const Documento_1 = require("../class/Documento");
const PedidoService_1 = require("../services/PedidoService");
class PedidoController {
    constructor() {
        this.getPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            this._pedidoService.getPedidos()
                .then((response) => {
                res.status(200).json(response);
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        });
        this._pedidoService = new PedidoService_1.PedidoService(Documento_1.DocumentoModel);
    }
}
exports.PedidoController = PedidoController;
