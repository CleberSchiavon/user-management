import * as Joi from 'joi';

export interface EnvironmentVariables {
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  API_JWT_SECRET: string;
}

export const validationSchemaForEnv = Joi.object<EnvironmentVariables, true>({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  API_JWT_SECRET: Joi.string().required(),
});
