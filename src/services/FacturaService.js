"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaService = void 0;
class FacturaService {
    constructor(facturaModel) {
        this.facturaModel = facturaModel;
    }
    getCuentasCobrar() {
        const query = this.buildCuentasCobrarQuery();
        return this.facturaModel.aggregate(query).exec();
    }
    buildCuentasCobrarQuery() {
        let query = [];
        return query;
    }
}
exports.FacturaService = FacturaService;
