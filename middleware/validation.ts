import Joi from "joi";
export const querySchemaRegistro = Joi.object({
  first_name: Joi.string().required().messages({'string.required': `Primer nombre es requerido`}),
  last_name: Joi.string().required().messages({'string.required': `Apellido es requerido`}),
  password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?])[A-Za-z0-9`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?]{8,}$/)).messages({  'string.base': `Contraseña debe ser de tipo texto`,
  'string.empty': `Contraseña no puede estar vacio`,
  'string.min': `Contraseña debe tener al menos 8 caracteres`,
  'string.required': `Contraseña es requerida`,
'string.pattern.base':"No cumple las condiciones de contraseña"}),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required().messages({'string.required': `Email es requerido`}),
    referallCode: Joi.string()
});
export const querySchemaCreateNFT = Joi.object({
  nombre: Joi.string().required(),
  userId: Joi.string().required(),
  cantidad: Joi.number().required(),
  imageIpfs:Joi.string().required()
});
export const querySchemaUGetAuth = Joi.object({
  password: Joi.string().required().pattern(new RegExp(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?])[A-Za-z0-9`~!@#$%^&*()\-_=+[{\]}|\\;:'",<.>\/?]{8,}$/)).messages({  'string.base': `Contraseña debe ser de tipo texto`,
  'string.empty': `Contraseña no puede estar vacio`,
  'string.min': `Contraseña debe tener al menos 8 caracteres`,
  'string.required': `Contraseña es requerida`,
'string.pattern.base':"No cumple las condiciones de contraseña"}),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
});
export const querySchemaAddReward = Joi.object({
  collectionID: Joi.number().required().messages({'string.required': `IDCOLLECTION es requerido`}),
  creationDate:Joi.string().required(),
  Fecha:Joi.string().required(),
  Recompensa:Joi.string().required(),
  hashrate:Joi.number(),
  FeePool:Joi.string(),
  FeeCollection:Joi.string(),
  FeeEnergy:Joi.string(),
  ratioSuccess:Joi.string(),
});
export const querySchemaBuyNftStripe = Joi.object({
  collectionID: Joi.number().required(),
  amount:Joi.number().required(),
});
export const querySchemaBuyNftMetamask= Joi.object({
  collectionID: Joi.number().required()
});
export const querySchemaUpdateKYC= Joi.object({
  auth_uuid: Joi.string().required()
});