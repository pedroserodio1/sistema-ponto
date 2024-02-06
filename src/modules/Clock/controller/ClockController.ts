import { Request, Response } from "express";
import { CreateClockService } from "../services/CreateClockService";
import ListClockService from "../services/ListClockService";

export class ClockController {
    public async create(req: Request, res: Response): Promise<Response> {
        const createClockService = new CreateClockService()

        const userId = req.user.id

        const clock = await createClockService.execute(userId)

        return res.status(202).json(clock)
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listClockService = new ListClockService()

        const userId = req.user.id


        const clock = await listClockService.execute(userId)

        return res.status(200).json(clock)

    }
}