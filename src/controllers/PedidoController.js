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
const CsvExportService_1 = require("../services/CsvExportService");
class PedidoController {
    constructor() {
        this.getPedidos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.export === "true") {
                    this._pedidoService.indexExport(req.query)
                        .then((response) => {
                        const fileName = "Pedidos.csv";
                        const columns = { _id: "Id", total: "Total", tipoCambio: "Tipo de Cambio", tienda: "Tienda", totalMXN: 'TotalMXN' };
                        const tiendaFormatter = (tienda) => {
                            const result = tienda.tienda[0];
                            return result;
                        };
                        const formatters = { tienda: tiendaFormatter };
                        this._csv.exportCSV(res, columns, response, fileName, formatters);
                    });
                }
                else {
                    this._pedidoService.index(req.query)
                        .then((response) => {
                        res.status(200).json(response);
                    })
                        .catch((error) => {
                        res.status(500).json(error);
                    });
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this._pedidoService = new PedidoService_1.PedidoService(Documento_1.DocumentoModel);
        this._csv = new CsvExportService_1.CsvExportService;
    }
}
exports.PedidoController = PedidoController;
//# sourceMappingURL=PedidoController.js.map