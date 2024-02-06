import { Router } from "express";
import { ClockController } from "../controller/ClockController";
import isAuthenticate from "@shared/http/middlewares/isAuthenticate";


const clockRouter = Router()
const clockController = new ClockController()

clockRouter.post('/', isAuthenticate, clockController.create)

clockRouter.get('/', isAuthenticate, clockController.index)

export default clockRouter