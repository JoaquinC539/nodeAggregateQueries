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
exports.FacturaController = void 0;
const Factura_1 = require("../class/Factura");
const FacturaService_1 = require("../services/FacturaService");
class FacturaController {
    constructor() {
        this.getCuentasPorCobrar = (req, res) => __awaiter(this, void 0, void 0, function* () {
        });
        this._facturaServce = new FacturaService_1.FacturaService(Factura_1.FacturaModel);
    }
}
exports.FacturaController = FacturaController;
