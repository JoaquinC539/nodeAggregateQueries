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
exports.TransporteController = void 0;
const express_1 = require("express");
const ConfigAutoTransporte_1 = require("./ConfigAutoTransporte");
const mongoose_1 = require("mongoose");
const TransporteJoi_1 = require("../Joi/TransporteJoi");
const AutoTransporte_1 = require("./AutoTransporte");
class TransporteController {
    constructor() {
        this.transportRouter = (0, express_1.Router)();
        this.indexConfig = (req, res) => {
            ConfigAutoTransporte_1.ConfigAutoTransporteModel.find().exec()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        };
        this.getConfig = (req, res) => {
            const id = isNaN(Number(req.params.id)) ? new mongoose_1.Types.ObjectId(req.params.id) : Number(req.params.id);
            ConfigAutoTransporte_1.ConfigAutoTransporteModel.findById(id).exec()
                .then((data) => {
                res.status(200).json(data);
            })
                .catch((error) => {
                res.status(500).json(error);
            });
        };
        this.saveConfig = (req, res) => {
            try {
                if (!req.body) {
                    res.status(400).json("No body data");
                    return;
                }
                const { error } = TransporteJoi_1.ConfigAutoTransporteJoi.validate(req.body);
                if (error) {
                    res.status(400).json(error);
                    return;
                }
                const conf = new ConfigAutoTransporte_1.ConfigAutoTransporte(req.body);
                if (req.body.clave) {
                    conf.clave = this.clavificar(req.body.clave);
                }
                else {
                    conf.clave = this.clavificar(req.body.nombre);
                }
                conf._id = new mongoose_1.Types.ObjectId();
                new ConfigAutoTransporte_1.ConfigAutoTransporteModel(conf).save();
                res.status(200).json(conf);
            }
            catch (error) {
                res.status(500).json({ 'error': error });
            }
        };
        this.updateConfig = (req, res) => {
            try {
                if (!req.body) {
                    res.status(400).json("No body data");
                    return;
                }
                const id = this.idParse(req.params.id);
                ConfigAutoTransporte_1.ConfigAutoTransporteModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' }).exec()
                    .then((response) => {
                    res.status(200).json(response);
                })
                    .catch((error) => {
                    res.status(500).json(error);
                });
            }
            catch (error) {
                res.status(500).json({ 'error': error });
            }
        };
        this.indexAutoT = (req, res) => {
            AutoTransporte_1.AutoTransporte.find().exec()
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                res.status(500).send(error);
            });
        };
        this.getAutoT = (req, res) => {
            AutoTransporte_1.AutoTransporte.findById(this.idParse(req.params.id)).exec()
                .then((data) => {
                res.status(200).send(data);
            })
                .catch((error) => {
                res.status(500).send(error);
            });
        };
        this.saveAutot = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = TransporteJoi_1.AutoTransporteJoi.validate(req.body);
            if (error) {
                res.status(400).send(error);
                return;
            }
            try {
                const autoT = new AutoTransporte_1.AutoTransporte(req.body);
                autoT.configVehicular = (yield ConfigAutoTransporte_1.ConfigAutoTransporteModel.findById(this.idParse(req.body.configVehicular)).exec());
                autoT._id = new mongoose_1.Types.ObjectId();
                autoT.save();
                res.status(200).send(autoT);
            }
            catch (error) {
                res.status(500).send(error);
                console.debug(error);
            }
        });
        this.updateAutoT = (req, res) => {
            try {
                if (!req.body) {
                    res.status(400).json({ error: "Not body data" });
                    return;
                }
                AutoTransporte_1.AutoTransporte.findByIdAndUpdate(this.idParse(req.params.id), req.body, { returnDocument: 'after' }).exec()
                    .then((data) => {
                    if (data) {
                        res.status(200).send(data);
                    }
                    else {
                        res.status(404).json({ error: "Not found" });
                    }
                });
            }
            catch (error) {
                res.status(500).send(error);
                console.debug(error);
            }
        };
        this.transportRouter.get('/configTransporte', this.indexConfig);
        this.transportRouter.get('/configTransporte/', this.indexConfig);
        this.transportRouter.get('/configTransporte/:id', this.getConfig);
        this.transportRouter.post('/configTransporte', this.saveConfig);
        this.transportRouter.put('/configTransporte/:id', this.updateConfig);
        this.transportRouter.get('/autoTransporte', this.indexAutoT);
        this.transportRouter.get('/autoTransporte/', this.indexAutoT);
        this.transportRouter.get('/autoTransporte/:id', this.getAutoT);
        this.transportRouter.post('/autoTransporte', this.saveAutot);
        this.transportRouter.put('/autoTransporte/:id', this.updateAutoT);
    }
    clavificar(nombre) {
        nombre = nombre.normalize('NFD');
        nombre = nombre.replace(/[\u0300-\u036f]/g, "");
        return nombre;
    }
    idParse(value) {
        return isNaN(Number(value)) ? new mongoose_1.Types.ObjectId(value) : Number(value);
    }
}
exports.TransporteController = TransporteController;
//# sourceMappingURL=TransporteController.js.map