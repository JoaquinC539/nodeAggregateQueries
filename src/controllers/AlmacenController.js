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
exports.AlmacenController = void 0;
const Almacen_1 = require("../class/Almacen");
const AlmacenService_1 = require("../services/AlmacenService");
const CsvExportService_1 = require("../services/CsvExportService");
class AlmacenController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.query.export === 'true' || req.headers["content-type"] === "text/csv") {
                try {
                    const almacenes = yield this._almacen.indexExport(req.query);
                    const fileName = yield "almacen.csv";
                    const columns = yield { _id: 'ID', clave: 'Clave', nombre: "Nombre" };
                    yield this._csv.exportCSV(res, columns, almacenes, fileName);
                    return;
                }
                catch (error) {
                    res.status(500).json(error);
                }
            }
            const almacenes = yield this._almacen.index(req.query);
            res.status(200).json(almacenes);
        });
        this._almacen = new AlmacenService_1.AlmacenService(Almacen_1.AlmacenModel);
        this._csv = new CsvExportService_1.CsvExportService();
    }
}
exports.AlmacenController = AlmacenController;
