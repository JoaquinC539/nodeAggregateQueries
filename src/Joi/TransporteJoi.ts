import Joi from "joi";
export const ConfigAutoTransporteJoi:Joi.ObjectSchema=Joi.object({
    nombre:Joi.string().required(),
    clave:Joi.string().optional()
});

export const AutoTransporteJoi:Joi.ObjectSchema=Joi.object({
    _id: Joi.any(),
  anioModeloVM: Joi.string().required(),
  aseguraRespCivil: Joi.string().required(),
  clave: Joi.string().required(),
  configVehicular: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  nombre: Joi.string().required(),
  numPermisoSCT: Joi.string().required(),
  permSCT: Joi.string().required(),
  placaVM: Joi.string().optional(),
  polizaRespCivil: Joi.string().optional()
})