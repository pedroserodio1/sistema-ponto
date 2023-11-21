import { prisma } from "@database/PrismaClient";
import {User} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";

export class ListUsersService{
    public async execute(): Promise<User[]>{

        const users = await prisma.user.findMany()

        if(!users){
            throw new AppError('Nenhum usuario encontrado', 404)
        }

        return users
    }
}