import Joi from 'joi';
export const AlmacenJoi:Joi.ObjectSchema=Joi.object({
    nombre:Joi.string().required(),
    noVenta:Joi.boolean(),
    direccion:Joi.string().required(),
    rfc:Joi.string(),
    activo:Joi.boolean(),
    inventarioNegativo:Joi.boolean()
});