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
class AlmacenService {
    constructor(almacenModel) {
        this.almacenModel = almacenModel;
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
        query.push({ $facet: {
                'results': [{ $skip: Number(queryParam.offset) }, { $limit: Number(queryParam.max) }],
                'count': [{ $count: 'count' }]
            } });
        return query;
    }
    baseIndexQuery(queryParam) {
        let query = [];
        query.push({ $match: { 'activo': { $eq: true } } });
        query.push({ $group: {
                '_id': '$_id',
                'clave': { $first: '$clave' },
                'nombre': { $first: '$nombre' },
            } });
        query.push({ $sort: { '_id': -1 } });
        return query;
    }
}
exports.AlmacenService = AlmacenService;
