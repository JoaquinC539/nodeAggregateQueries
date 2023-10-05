"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaService = void 0;
class FacturaService {
    constructor(facturaModel) {
        this.facturaModel = facturaModel;
    }
    getFacturaIndex(queryParams) {
        const query = this.buildFacturaIndexQuery(queryParams);
        return this.facturaModel.aggregate(query).exec();
    }
    getFacturaIndexExport(queryParams) {
        const query = this.buildFacturaIndexQueryExport(queryParams);
        return this.facturaModel.aggregate(query).exec();
    }
    buildFacturaIndexQuery(queryParam) {
        if (queryParam.offset === undefined) {
            queryParam.offset = 1;
        }
        if (queryParam.max === undefined) {
            queryParam.max = 15;
        }
        let query = [];
        query.push({ $sort: { '_id': -1 } });
        query.push({ $match: { 'estatus': 'TIMBRADA' } });
        query.push({ $lookup: { from: 'proveedor', localField: 'cliente', foreignField: '_id', as: 'Cliente' } });
        query.push({ $lookup: { from: 'serie', localField: 'serie', foreignField: '_id', as: 'Serie' } });
        query.push({ $unwind: '$documentos' });
        query.push({ $lookup: { from: 'documento', localField: 'documentos', foreignField: '_id', as: 'Documento' } });
        query.push({ $lookup: { from: 'formaDePago', localField: 'formaDePago', foreignField: '_id', as: 'FormaDePago' } });
        query.push({ $lookup: { from: 'proveedor', localField: 'tienda', foreignField: '_id', as: 'Tienda' } });
        query.push({ $project: {
                "_id": 1,
                "estatus": 1,
                "cliente": { $arrayElemAt: ["$Cliente.nombre", 0] },
                'serie': { $arrayElemAt: ['$Serie.nombre', 0] },
                "folio": 1,
                "razonSocial": { $arrayElemAt: ['$Documento.datosFacturacionId', 0] },
                "formaDePago": { $arrayElemAt: ['$FormaDePago.nombre', 0] },
                "fecha": 1,
                "moneda": 1,
                "tienda": { $arrayElemAt: ['$Tienda.nombre', 0] },
                "total": 1,
                "totalTC": { $multiply: ['$total', '$tipoCambio'] }
            } });
        query.push({ $facet: {
                'results': [{ $skip: Number(queryParam.offset) }, { $limit: Number(queryParam.max) }],
                'count': [{ $count: 'count' }]
            } });
        return query;
    }
    buildFacturaIndexQueryExport(queryParam) {
        if (queryParam.offset === undefined) {
            queryParam.offset = 1;
        }
        if (queryParam.max === undefined) {
            queryParam.max = 15;
        }
        let query = [];
        query.push({ $sort: { '_id': -1 } });
        query.push({ $match: { 'estatus': 'TIMBRADA' } });
        query.push({ $lookup: { from: 'proveedor', localField: 'cliente', foreignField: '_id', as: 'Cliente' } });
        query.push({ $lookup: { from: 'serie', localField: 'serie', foreignField: '_id', as: 'Serie' } });
        query.push({ $unwind: '$documentos' });
        query.push({ $lookup: { from: 'documento', localField: 'documentos', foreignField: '_id', as: 'Documento' } });
        query.push({ $lookup: { from: 'formaDePago', localField: 'formaDePago', foreignField: '_id', as: 'FormaDePago' } });
        query.push({ $lookup: { from: 'proveedor', localField: 'tienda', foreignField: '_id', as: 'Tienda' } });
        query.push({ $project: {
                "_id": 1,
                "estatus": 1,
                "Cliente._id": 1,
                "Cliente.nombre": 1,
                'Serie': { $arrayElemAt: ['$Serie.nombre', 0] },
                "folio": 1,
                "razonSocial": { $arrayElemAt: ['$Documento.datosFacturacionId', 0] },
                "FormaDePago": { $arrayElemAt: ['$FormaDePago.nombre', 0] },
                "fecha": 1,
                "moneda": 1,
                "Tienda": { $arrayElemAt: ['$Tienda.nombre', 0] },
                "total": 1,
                "totalTC": { $multiply: ['$total', '$tipoCambio'] }
            } });
        return query;
    }
}
exports.FacturaService = FacturaService;
