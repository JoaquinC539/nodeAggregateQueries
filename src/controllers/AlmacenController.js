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
const AlmacenJoi_1 = require("../Joi/AlmacenJoi");
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
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            try {
                if (!req.body) {
                    res.status(400).json({ error: 'Empty request' });
                    return;
                }
                else {
                    const { error } = AlmacenJoi_1.AlmacenJoi.validate(req.body);
                    if (error) {
                        res.status(400).json({ error: "Error in almacen creation check the error", description: error.details[0].message });
                        return;
                    }
                    const clave = req.body.nombre.trim().toLowerCase();
                    const almacen = new Almacen_1.Almacen({
                        nombre: req.body.nombre,
                        clave: clave,
                        inventarioNegativo: (req.body.inventarioNegativo ? req.body.inventarioNegativo : false),
                        noVenta: req.body.noVenta ? req.body.noVenta : false,
                        activo: (req.body.activo ? req.body.activo : true),
                        direccion: req.body.direccion,
                        rfc: req.body.rfc ? req.body.rfc : null,
                    });
                    const almacenModel = new Almacen_1.AlmacenModel(almacen);
                    almacenModel.save();
                    res.status(200).json(almacen);
                }
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this._almacen = new AlmacenService_1.AlmacenService(Almacen_1.AlmacenModel);
        this._csv = new CsvExportService_1.CsvExportService();
    }
}
exports.AlmacenController = AlmacenController;
