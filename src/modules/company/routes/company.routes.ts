import { Router } from "express";
import { CompanyController } from "../controller/CompanyController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";

const companyRoute = Router();
const companyController = new CompanyController();

companyRoute.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      state_registration: Joi.string().required(),
      opening_date: Joi.date().required(),
      phone: Joi.string().required(),
      site: Joi.string().required(),
      adress: Joi.object({
        street: Joi.string().required(),
        number: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        complement: Joi.string(),
        cep: Joi.string().required(),
        state: Joi.string().required()
      }),
      numberphone: Joi.string().required(),
      cnpj: Joi.string().required(),
      email: Joi.string().required()
    },
  }),
  isAuthenticate,
  companyController.create
);

/* name: string;
    opening_date: Date;
    phone: string;
    state_registration: string;
    adress: {
        street: string,
        number: string,
        city: string,
        district: string,
        complement?: string
        cep: string,
        state: string
    };
    numberphone: string;
    cnpj: string;
    email: string;
    site: string */


companyRoute.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      state_registration: Joi.string(),
      opening_date: Joi.date(),
      phone: Joi.string(),
      site: Joi.string(),
      adress: Joi.object({
        street: Joi.string(),
        number: Joi.string(),
        city: Joi.string(),
        district: Joi.string(),
        complement: Joi.string(),
        cep: Joi.string(),
        state: Joi.string()
      }),
      numberphone: Joi.string(),
      cnpj: Joi.string(),
      email: Joi.string()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  companyController.update
);

companyRoute.get("/", isAuthenticate, companyController.index);

companyRoute.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  companyController.show
);

companyRoute.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  companyController.delete
);


export default companyRoute;
