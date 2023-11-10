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
const CsvExportService_1 = require("../services/CsvExportService");
class FacturaController {
    constructor() {
        this.getIndexFacturas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // console.log(req.query)
            if (req.query.export === "true" || req.headers["content-type"] === "text/csv") {
                try {
                    const facturas = yield this._facturaServce.getFacturaIndexExport(req.query);
                    const fileName = "facturas.csv";
                    const columns = { _id: "ID", estatus: "Estatus", tipo: "Tipo", fecha: "Fecha", folio: "Folio",
                        moneda: "Moneda", total: "Total", cliente: 'Cliente', serie: "Serie",
                        razonSocial: "Razon Social", FormaDePago: "Forma de Pago", Tienda: "Tienda", totalTC: "Total x tipo Cambio" };
                    const formateDate = (date) => {
                        let datejs = new Date(date);
                        return datejs.toLocaleDateString("es-MX");
                    };
                    const formatters = { fecha: formateDate };
                    yield this._csvExportService.exportCSV(res, columns, facturas, fileName, formatters);
                    return;
                }
                catch (error) {
                    res.status(500).json({ error: "Error in exporting to csv", err: error });
                }
            }
            const facturas = yield this._facturaServce.getFacturaIndex(req.query);
            res.status(200).json(facturas);
        });
        this._facturaServce = new FacturaService_1.FacturaService(Factura_1.FacturaModel);
        this._csvExportService = new CsvExportService_1.CsvExportService();
    }
}
exports.FacturaController = FacturaController;
//# sourceMappingURL=FacturaController.js.map