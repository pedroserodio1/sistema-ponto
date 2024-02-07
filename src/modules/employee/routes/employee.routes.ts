import { Router } from "express";
import { EmployeeController } from "../controller/EmployeeController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";

const employeeRoute = Router();
const employeeController = new EmployeeController();

employeeRoute.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      surname: Joi.string().required(),
      birthday: Joi.date().required(),
      function: Joi.string().required(),
      nivel: Joi.number().required(),
      address: Joi.object({
        street: Joi.string().required(),
        number: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        complement: Joi.string(),
        cep: Joi.string().required(),
        state: Joi.string().required()
      }),
      numberphone: Joi.string().required(),
      cpf: Joi.string().required(),
      email: Joi.string().required(),
      company_id: Joi.string()
    },
  }),
  isAuthenticate,
  employeeController.create
);


employeeRoute.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
        name: Joi.string(),
        surname: Joi.string(),
        birthday: Joi.date(),
        function: Joi.string(),
        nivel: Joi.number(),
        address: Joi.object({
          street: Joi.string(),
          number: Joi.string(),
          city: Joi.string(),
          district: Joi.string(),
          complement: Joi.string(),
          cep: Joi.string()
        }),
        numberphone: Joi.string(),
        cpf: Joi.string(),
        email: Joi.string()
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  employeeController.update
);

employeeRoute.get("/", isAuthenticate, employeeController.index);

employeeRoute.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  employeeController.show
);

employeeRoute.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  isAuthenticate,
  employeeController.delete
);


export default employeeRoute;
