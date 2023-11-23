"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigAutoTransporteModel = exports.ConfigAutoTransporte = void 0;
const mongoose_1 = require("mongoose");
class ConfigAutoTransporte {
    constructor(data) {
        this.Schema = new mongoose_1.Schema({
            _id: { type: mongoose_1.Schema.Types.Mixed },
            clave: String,
            nombre: String
        });
        if (data) {
            Object.assign(this, data);
        }
    }
    toJSON() {
        return {
            _id: this._id,
            clave: this.clave,
            nombre: this.nombre
        };
    }
}
exports.ConfigAutoTransporte = ConfigAutoTransporte;
exports.ConfigAutoTransporteModel = (0, mongoose_1.model)('ConfigAutoTransporte', new ConfigAutoTransporte().Schema, 'configAutotransporte');
//# sourceMappingURL=ConfigAutoTransporte.js.map