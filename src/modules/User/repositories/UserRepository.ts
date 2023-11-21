import { prisma } from "@database/PrismaClient";
import {User} from '@prisma/client'

export class UserRepository{
    public async findByUsername(username?: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        })

        return user
    }

    public async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        })

        return user
    }
}