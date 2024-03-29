import { prisma } from "@database/PrismaClient";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class DeleteUserService{
    public async execute(id: string, nivelLogin: string): Promise<void> {

        verifyNivel(nivelLogin, "3")
        const userRepository = new UserRepository()

        const userExists = await userRepository.findById(id)

        if(!userExists){
            throw new AppError('Usuario não encontrado', 404)
        }

        await prisma.user.delete({
            where: {
                id
            }
        })
    }
}