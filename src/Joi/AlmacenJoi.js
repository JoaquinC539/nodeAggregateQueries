"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlmacenJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AlmacenJoi = joi_1.default.object({
    nombre: joi_1.default.string().required(),
    noVenta: joi_1.default.boolean(),
    direccion: joi_1.default.string().required(),
    rfc: joi_1.default.string(),
    activo: joi_1.default.boolean(),
    inventarioNegativo: joi_1.default.boolean()
});
//# sourceMappingURL=AlmacenJoi.js.map