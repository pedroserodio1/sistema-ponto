import { Router } from "express";
import { UserController } from "../controller/UserController";
import {celebrate, Joi, Segments} from 'celebrate'
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";

const userRouter = Router()
const userController = new UserController()

userRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }),
    isAuthenticate,
    userController.create
)

userRouter.put(
    '/:id',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string(),
            password: Joi.string()
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    isAuthenticate,
    userController.update
)

userRouter.get('/', isAuthenticate ,userController.index)

userRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    isAuthenticate,
    userController.show
)

userRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    isAuthenticate,
    userController.delete
)

userRouter.post(
    '/login',
    celebrate({
        [Segments.BODY]: {
            username: Joi.string().required(),
            password: Joi.string().required()
        }
    }),
    userController.login
)

export default userRouter