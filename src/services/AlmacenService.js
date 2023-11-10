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
exports.AlmacenService = void 0;
const Almacen_1 = require("../class/Almacen");
const mongoose_1 = require("mongoose");
class AlmacenService {
    constructor(almacenModel) {
        this.almacenModel = almacenModel;
        this.types = mongoose_1.Types;
    }
    index(queryParam) {
        const query = this.indexQuery(queryParam);
        return this.almacenModel.aggregate(query).exec();
    }
    indexExport(queryParam) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.baseIndexQuery(queryParam);
            return this.almacenModel.aggregate(query).exec();
        });
    }
    indexQuery(queryParam) {
        if (queryParam.offset === undefined) {
            queryParam.offset = 0;
        }
        if (queryParam.max === undefined) {
            queryParam.max = 15;
        }
        const query = this.baseIndexQuery(queryParam);
        if (queryParam.offset !== undefined && queryParam.max !== undefined) {
            query.push({ $facet: {
                    'results': [{ $skip: Number(queryParam.offset) }, { $limit: Number(queryParam.max) }],
                    'count': [{ $count: 'count' }]
                } });
        }
        return query;
    }
    baseIndexQuery(queryParam) {
        let query = [];
        if (queryParam.id !== undefined && queryParam.id !== '' && queryParam.id !== "null") {
            if (isNaN(Number(queryParam.id))) {
                if (mongoose_1.Types.ObjectId.isValid(queryParam.id)) {
                    query.push({ $match: { '_id': new mongoose_1.Types.ObjectId(queryParam.id) } });
                }
            }
            else {
                query.push({ $match: { '_id': Number(queryParam.id) } });
            }
        }
        if (queryParam.nombre !== undefined && queryParam.nombre !== '' && queryParam.nombre !== "null") {
            // query.push({$match:{'nombre':String(queryParam.nombre)}})
            query.push({ $match: { 'nombre': { $regex: queryParam.nombre, $options: 'i' } } });
        }
        if (queryParam.activo !== undefined && queryParam.activo == "on" && queryParam.activo !== "null") {
            query.push({ $match: { 'activo': { $in: [true, false] } } });
        }
        else {
            query.push({ $match: { 'activo': { $eq: true } } });
        }
        query.push({ $project: {
                '_id': 1,
                'clave': 1,
                'nombre': 1,
                'direccion': 1,
                'activo': 1
            } });
        query.push({ $sort: { '_id': -1 } });
        return query;
    }
    searchForId(id) {
        const query = [];
        if (id !== undefined || id !== null) {
            id = isNaN(Number(id)) ? new mongoose_1.Types.ObjectId(id) : Number(id);
            query.push({ $match: { '_id': id } });
        }
        return Almacen_1.AlmacenModel.aggregate(query).exec();
    }
}
exports.AlmacenService = AlmacenService;
//# sourceMappingURL=AlmacenService.js.map