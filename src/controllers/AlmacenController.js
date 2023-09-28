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
class AlmacenController {
    constructor(expressInstance) {
    }
    getAlmacenes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const almacen :Array<IAlmacen>=await AlmacenModel.find();
                function Query() {
                    return __awaiter(this, void 0, void 0, function* () {
                        let query = [];
                        query.push({ $match: { 'activo': { $eq: true } } });
                        query.push({ $group: {
                                '_id': '$_id',
                                'clave': { $first: '$clave' },
                                'activo': { $first: '$activo' }
                            } });
                        query.push({ $sort: { '_id': -1 } });
                        return yield Almacen_1.AlmacenModel.aggregate(query).exec();
                    });
                }
                const almacenes = yield Query();
                console.log(almacenes.length);
                res.status(200).json(almacenes);
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
    }
}
exports.AlmacenController = AlmacenController;
