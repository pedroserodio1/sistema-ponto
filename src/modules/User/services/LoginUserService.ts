
import {User} from "@prisma/client"
import { prisma } from "@database/PrismaClient";

import { AppError } from "@shared/AppError/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'
import { UserRepository } from "../repositories/UserRepository";
import { DateTime } from "luxon"

interface IRequest {
    username: string
    password: string
}

interface IResponse {
    user: User
    token: string,
    login_datetime: DateTime
}

export class LoginUserService{
    public async execute(data: IRequest): Promise<IResponse>{
        const userRepository = new UserRepository()

        const user = await userRepository.findByUsername(data.username)

        if(!user){
            throw new AppError('Usuario ou senha incorretos', 401)
        }

        const passwordConfirmed = await compare(data.password, user.password)

        if(!passwordConfirmed){
            throw new AppError('Usuario ou senha incorretos', 401)
        }

        const employeeData = await  prisma.employee.findFirst({
            where: {
                 id: user.employee_id
            },
            select: {
                nivel: true,
                company_id: true
            }
        })

        const token = sign({nivel: employeeData?.nivel, company_id: employeeData?.company_id}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
            login_datetime: DateTime.now()
        }

        
    }
}