"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DireccionModel = exports.Direccion = exports.DireccionSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.DireccionSchema = new mongoose_1.Schema({
    calle: String,
    noExterior: String,
    noInterior: String,
    codigoPostal: String,
    telefono: String,
    pais: String,
    colonia: String,
    municipio: String,
    ciudad: String,
    estado: String,
    referencias: String,
    nombre: String,
    instruccionesEntrega: String,
    isDefault: Boolean,
    fechaBaja: Date,
});
class Direccion {
    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
exports.Direccion = Direccion;
exports.DireccionModel = mongoose_1.default.model("Direccion", exports.DireccionSchema, 'direccion');
