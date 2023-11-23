"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTransporte = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.Mixed,
    anioModeloVM: String,
    aseguraRespCivil: String,
    clave: String,
    configVehicular: { type: mongoose_1.Schema.Types.Mixed, ref: 'ConfigAutoTransporte' },
    nombre: String,
    numPermisoSCT: String,
    permSCT: String,
    placaVM: String,
    polizaRespCivil: String
});
exports.AutoTransporte = (0, mongoose_1.model)('AutoTransporte', schema, 'autoTransporte');
//# sourceMappingURL=AutoTransporte.js.map