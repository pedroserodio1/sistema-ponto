import { prisma } from "@database/PrismaClient";
import { UserRepository } from "../repositories/UserRepository";
import { AppError } from "@shared/AppError/AppError";

export class DeleteUserService{
    public async execute(id: string): Promise<void> {
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