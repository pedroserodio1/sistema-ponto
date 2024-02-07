import { prisma } from "@database/PrismaClient";
import {Company} from '@prisma/client'

export class CompanyRepository{
    public async findByCnpj(cnpj: string): Promise<Company | null> {
        const user = await prisma.company.findFirst({
            where: {
                cnpj
            }
        })

        return user
    }

    public async findById(id: string): Promise<Company | null> {
        const user = await prisma.company.findFirst({
            where: {
                id
            }
        })

        return user
    }
}