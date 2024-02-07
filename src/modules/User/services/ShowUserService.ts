import {User} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import { UserRepository } from "../repositories/UserRepository";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ShowUsersService{
    public async execute(id: string, nivelLogin: string): Promise<User>{

        verifyNivel(nivelLogin, "3")
        const userRepository = new UserRepository()

        const user = await userRepository.findById(id)

        if(!user){
            throw new AppError('Usuario não encontrado', 404)
        }

        return user
    }
}