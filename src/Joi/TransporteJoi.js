"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTransporteJoi = exports.ConfigAutoTransporteJoi = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ConfigAutoTransporteJoi = joi_1.default.object({
    nombre: joi_1.default.string().required(),
    clave: joi_1.default.string().optional()
});
exports.AutoTransporteJoi = joi_1.default.object({
    _id: joi_1.default.any(),
    anioModeloVM: joi_1.default.string().required(),
    aseguraRespCivil: joi_1.default.string().required(),
    clave: joi_1.default.string().required(),
    configVehicular: joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object()).required(),
    nombre: joi_1.default.string().required(),
    numPermisoSCT: joi_1.default.string().required(),
    permSCT: joi_1.default.string().required(),
    placaVM: joi_1.default.string().optional(),
    polizaRespCivil: joi_1.default.string().optional()
});
//# sourceMappingURL=TransporteJoi.js.map