import { prisma } from "@database/PrismaClient";
import {User} from '@prisma/client'
import {hash} from 'bcryptjs'
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "@shared/AppError/AppError";

interface IRequest {
    username: string
    password: string
}

export class CreateUserService {
    public async execute(data: IRequest): Promise<User>{
        const userRepository = new UserRepository()


        const userExists = await userRepository.findByUsername(data.username)

        if(userExists !== null){
            throw new AppError('Usuario ja cadastro')
        }

        const hashedPassword = await hash(data.password, 8)

        const user = await prisma.user.create({
            data: {
                username: data.username,
                password: hashedPassword
            }
        })

        return user
        
    }
}