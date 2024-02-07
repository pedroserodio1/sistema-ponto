import {prisma} from "@database/PrismaClient"
import { UserRepository } from "@modules/User/repositories/UserRepository";
import { AppError } from "@shared/AppError/AppError";


type clock = ({
    User: {
        id: string;
        username: string;
        password: string;
        created_at: Date;
        updated_at: Date;
    };
    } & {
        id: string;
        clock_time: Date;
        user_id: string;
})[]

export default class ShowClockUserService {
    public async execute(userId: string): Promise<clock>{

        const userRepository = new UserRepository()
        
        const userExists = await userRepository.findById(userId)

        if(!userExists){
            throw new AppError("Usuario não encontrado", 404)
        }

        const clock = await prisma.clock.findMany({
            where: {
                user_id: userId
            },
            include: {
                User: {
                    include: {
                        Employee: true
                    }
                }
            }
        })

        return clock


    }
}