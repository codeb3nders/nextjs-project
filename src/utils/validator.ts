import Joi from "joi";
import { uuid } from "./uuid";

const validator = (schema: Joi.ObjectSchema) => (payload: any) =>
  schema.validate(payload, { abortEarly: false });

const testSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required(),
  email: Joi.string().email().required(),
});

export const validateTest = validator(testSchema);

// ACCOUNT
const accountSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().required(),
  contactNumber: Joi.string().required(),
  businessName: Joi.string().required(),
  businessEmail: Joi.string().required(),
  businessAddress: Joi.string().required(),
  businessContactNumber: Joi.string().required(),
  status: Joi.string().required(),
  password: Joi.string().required(),
  createdAt: Joi.string().required(),
});

export const validateAccount = validator(accountSchema);
