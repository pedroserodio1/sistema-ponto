import { prisma } from "@database/PrismaClient";
import {User} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ListUsersService{
    public async execute(nivelLogin: string): Promise<User[]>{

        verifyNivel(nivelLogin, "3")

        const users = await prisma.user.findMany()

        if(!users){
            throw new AppError('Nenhum usuario encontrado', 404)
        }

        return users
    }
}