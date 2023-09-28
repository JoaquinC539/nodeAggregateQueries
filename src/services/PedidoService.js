"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoService = void 0;
class PedidoService {
    constructor(documentoModel) {
        this.documentoModel = documentoModel;
    }
    getPedidos() {
        const query = this.buildPedidosQuery();
        return this.documentoModel.aggregate(query).exec();
    }
    buildPedidosQuery() {
        let query = [];
        query.push({ $match: { '_class': 'Pedido' } });
        query.push({ $match: { 'estatus': 'FINALIZADO' } });
        query.push({ $lookup: { from: 'proveedor', localField: 'tienda', foreignField: '_id', as: 'Tienda' } });
        query.push({ $addFields: { 'totalMXN': { $multiply: ['$total', '$tipoCambio'] } } });
        query.push({ $group: {
                '_id': '$_id',
                'total': { $first: '$total' },
                'tipoCambio': { $first: '$tipoCambio' },
                'totalMXN': { $first: '$totalMXN' },
                'tienda': { $addToSet: { 'tienda': '$Tienda.nombre', 'clave': '$Tienda.clave' } }
            } });
        query.push({ $unwind: { path: '$tienda', preserveNullAndEmptyArrays: false } });
        // query.push({$limit:3});
        query.push({ $sort: { '_id': -1 } });
        return query;
    }
}
exports.PedidoService = PedidoService;
