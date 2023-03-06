import Joi from "joi";
export const querySchemaRegistro = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
    wallet_ETH:Joi.string()
});
export const querySchemaCreateNFT = Joi.object({
  nombre: Joi.string().required(),
  userId: Joi.string().required(),
  cantidad: Joi.number().required(),
  imageIpfs:Joi.string().required()
});
export const querySchemaUGetAuth = Joi.object({
  password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});
export const querySchemaAddReward = Joi.object({
  collectionID: Joi.number().required,
  creationDate:Joi.string().required(),
  Fecha:Joi.string().required(),
  Recompensa:Joi.string().required(),
  hashrate:Joi.number(),
  FeePool:Joi.string(),
  FeeCollection:Joi.string(),
  FeeEnergy:Joi.string(),
  ratioSuccess:Joi.string(),
});
