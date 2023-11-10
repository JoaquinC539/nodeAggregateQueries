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
exports.AlmacenModel = exports.Almacen = exports.AlmacenSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Direccion_1 = require("./Direccion");
exports.AlmacenSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.Mixed },
    nombre: String,
    clave: String,
    activo: Boolean,
    inventarioNegativo: Boolean,
    noVenta: Boolean,
    direccion: String,
    direccionObj: Direccion_1.DireccionSchema,
    offset: Number,
    rfc: String,
}, {
    collection: 'almacen'
});
class Almacen {
    constructor(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
}
exports.Almacen = Almacen;
exports.AlmacenModel = mongoose_1.default.model("Almacen", exports.AlmacenSchema, 'almacen');
//# sourceMappingURL=Almacen.js.map