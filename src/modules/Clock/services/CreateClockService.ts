import {prisma} from "@database/PrismaClient"
import { UserRepository } from "@modules/User/repositories/UserRepository";
import {Clock} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";

export class CreateClockService{
    public async execute(userId: string): Promise<Clock> {
        const userRepository = new UserRepository()
        
        const userExists = await userRepository.findById(userId)

        if(!userExists){
            throw new AppError("Usuario não encontrado", 404)
        }

        const clock = await prisma.clock.create({
            data: {
                user_id: userId
            }
        })

        return clock
    }
}