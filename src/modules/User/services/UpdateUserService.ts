import { prisma } from "@database/PrismaClient";
import {User} from "@prisma/client"
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "@shared/AppError/AppError";
import { hash } from "bcryptjs";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";


interface IRequest {
    username?: string
    password?: string
}

export class UpdateUserService{
    public async execute(id: string, data: IRequest, nivelLogin: string): Promise<User>{

        verifyNivel(nivelLogin, "3")
        let hashedPassword
        
        const userRepository = new UserRepository()

        const userExists = await userRepository.findById(id)

        if(data.password){
            hashedPassword = await hash(data.password, 8)
        }else{
            hashedPassword = userExists?.password
        }


        if(!userExists){
            throw new AppError('Usuario não encontrado', 404)
        }

        const user = await prisma.user.update({
            where: {
                id,
                
            },
            data: {
                username: data.username,
                password: hashedPassword
            }
        })

        return user
    }
}