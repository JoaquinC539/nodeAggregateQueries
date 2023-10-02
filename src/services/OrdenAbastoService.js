"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenAbastoService = void 0;
class OrdenAbastoService {
    constructor(ordenAbastoModel, facturaModel) {
        this.ordenAbastoModel = ordenAbastoModel;
        this.facturaModel = facturaModel;
    }
    getCuentasCobrar() {
        const query = this.buildCuentasCobrarQuery({});
        return this.facturaModel.aggregate(query).exec();
    }
    buildCuentasCobrarQuery(queryParams) {
        let query = [];
        let today = new Date();
        let hasta30 = this.substractMonths(today, 1);
        let hasta60 = this.substractMonths(today, 2);
        let hasta90 = this.substractMonths(today, 3);
        query.push({ $match: { 'related': { $exists: false } } });
        query.push({ $match: { $or: [{ estatus: 'TIMBRADA' }, { estatus: 'MANUAL' }] } });
        query.push({ $match: { $or: [{ _class: { $exists: false } }, { _class: 'FacturaManual' }] } });
        query.push({ $match: { 'serie_info.clave': { $nin: ['Y', 'YE'] } } });
        query.push({ $lookup: { from: 'proveedor', localField: 'cliente', foreignField: '_id', as: 'cliente_info' } });
        query.push({ $lookup: { from: 'documento', localField: 'documento', foreignField: '_id', as: 'documento_info' } });
        query.push({ $lookup: { from: 'user', localField: 'documento_info.vendedor', foreignField: '_id', as: 'vendedor_info' } });
        query.push({ $lookup: { from: 'serie', localField: 'serie', foreignField: '_id', as: 'serie_info' } });
        // if (queryParams.cliente !==null || queryParams.cliente !==undefined) {
        //     console.log("cliente",queryParams.cliente)
        //     query.push({ $match: { 'cliente_info._id': queryParams.cliente as number } });
        // }
        // if (queryParams.moneda !==null || queryParams.moneda !==undefined) {
        //     console.log("moneda")
        //     query.push({ $match: { 'moneda': queryParams.moneda } });
        // }
        // if (queryParams.vendedor !==null || queryParams.vendedor!==undefined) {
        //     console.log("vendedor")
        //     query.push({ $match: { 'vendedor_info._id': queryParams.vendedor as number } });
        // }
        query.push({ $match: { 'fechaContabilizacion': { $exists: false } } });
        query.push({ $lookup: { from: 'pago', let: { p_documento: '$documento', p_id: '$_id' }, pipeline: [{ $match: { $expr: { $and: [{ $eq: ['$pedido', '$$p_documento'] }, { $eq: ['$factura', '$$p_id'] }] } } }], as: 'pagos' } });
        query.push({ $unwind: { path: '$pagos', preserveNullAndEmptyArrays: true } });
        query.push({ $addFields: { pago2: { $cond: [{ $and: [{ $eq: ['$pagos.estatusPago', 'APROBADO'] }, { $lte: ['$pagos.fecha', (new Date())] }, { $eq: ['$pagos.estatusValidacion', 'VALIDO'] }] }, { $cond: [{ $eq: ['$pagos.moneda', 3] }, '$pagos.montoOriginal', { $multiply: ['$pagos.montoOriginal', '$pagos.tc'] }] }, 0] } } });
        query.push({ $addFields: { valor2: { $multiply: ['$total', '$tipoCambio'] } } });
        query.push({ $group: { '_id': '$_id', 'documento': { $first: '$documento' }, 'fechaRevision': { $first: '$fechaRevision' }, 'diasCredito': { $first: '$diasCredito' }, 'cliente_info': { $first: '$cliente_info' }, 'vendedor_info': { $first: '$vendedor_info' }, 'serie_info': { $first: '$serie_info' }, 'pagoBQ': { $sum: '$pago2' }, 'moneda': { $first: '$moneda' }, 'folio': { $first: '$folio' }, 'total': { $first: '$valor2' } } });
        query.push({ $lookup: { from: 'factura', localField: '_id', foreignField: 'factura', as: 'notas' } });
        query.push({ $unwind: { path: '$notas', preserveNullAndEmptyArrays: true } });
        query.push({ $group: {
                '_id': '$_id',
                'documento': { '$first': '$documento' },
                'fechaRevision': { '$first': '$fechaRevision' },
                'diasCredito': { '$first': '$diasCredito' },
                'cliente_info': { '$first': '$cliente_info' },
                'vendedor_info': { '$first': '$vendedor_info' },
                'serie_info': { '$first': '$serie_info' },
                'pagoN': { '$sum': '$nota2' },
                'pagoBQ': { '$first': '$pagoBQ' },
                'moneda': { '$first': '$moneda' },
                'folio': { '$first': '$folio' },
                'total': { '$first': '$total' }
            }
        });
        query.push({
            $addFields: {
                'mesQ': { $month: '$fechaRevision' },
                'anioQ': { $year: '$fechaRevision' },
                'vendedorQ': { $cond: [{ $eq: ['$vendedor_info', []] }, 'Sin Vendedor', { $arrayElemAt: ['$vendedor_info.nombre', 0] }] },
                'clienteQ': { $cond: [{ $eq: ['$cliente_info', []] }, 'Sin Cliente', { $arrayElemAt: ['$cliente_info.nombre', 0] }] },
                'rfcQ': { $cond: [{ $eq: ['$cliente_info', []] }, 'Sin Cliente', { $arrayElemAt: ['$cliente_info.rfc', 0] }] },
                'idClienteQ': { $cond: [{ $eq: ['$cliente_info', []] }, 0, { $arrayElemAt: ['$cliente_info._id', 0] }] },
                'diasCreditoClienteQ': { $cond: [{ $eq: ['$cliente_info', []] }, 0, { $arrayElemAt: ['$cliente_info.diasCredito', 0] }] },
                'facturaQ': { $concat: [{ $arrayElemAt: ['$serie_info.clave', 0] }, { $toString: '$folio' }] },
                'rangoQ': {
                    $cond: [
                        { $gt: ['$fechaRevision', hasta30] },
                        '30 Dias',
                        {
                            $cond: [
                                { $and: [{ $lt: ['$fechaRevision', hasta30] }, { $gt: ['$fechaRevision', hasta60] }] },
                                '60 Dias',
                                {
                                    $cond: [
                                        { $and: [{ $lt: ['$fechaRevision', hasta60] }, { $gt: ['$fechaRevision', hasta90] }] },
                                        '90 Dias',
                                        '90+ Dias'
                                    ]
                                }
                            ]
                        }
                    ]
                },
                'rangoInt': { $round: { $divide: [{ $subtract: [today, '$fechaRevision'] }, 86400000] } },
                'saldoQ': '$total',
                'pagoQ': { $add: ['$pagoN', '$pagoBQ'] }
            }
        });
        query.push({ $addFields: { 'totalQ': { $subtract: ['$saldoQ', '$pagoQ'] } } });
        query.push({ $match: { $or: [{ 'totalQ': { $gt: 0 } }, { 'totalQ': { $lt: 0 } }] } });
        query.push({
            $project: {
                '_id': 1,
                'facturaIdQ': '$documento',
                'mesQ': 1,
                'anioQ': 1,
                'moneda': 1,
                'Vendedor': { $ifNull: ['$vendedorQ', 'Sin Vendedor'] },
                'Cliente': { $ifNull: ['$clienteQ', 'Sin Cliente'] },
                'RFC': { $ifNull: ['$rfcQ', 'Sin Cliente'] },
                'idClienteQ': { $ifNull: ['$idClienteQ', 0] },
                'diasCreditoClienteQ': { $ifNull: ['$diasCreditoClienteQ', 0] },
                'Factura': '$facturaQ',
                'rangoQ': 1,
                'rangoInt': 1,
                'totalQ': 1,
                'fechaRevisionQ': '$fechaRevision',
                'diasCreditoQ': { $ifNull: ['$diasCredito', 0] }
            }
        });
        query.push({ $addFields: { 'alerta': { $subtract: ['$diasCreditoQ', '$rangoInt'] } } });
        query.push({ $sort: { 'fechaRevisionQ': -1 } });
        return query;
    }
    substractMonths(date, months) {
        let newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - months);
        return newDate;
    }
}
exports.OrdenAbastoService = OrdenAbastoService;
