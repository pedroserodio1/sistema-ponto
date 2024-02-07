import { prisma } from "@database/PrismaClient";
import {Employee} from '@prisma/client'

export class EmployeeRepository{
    public async findByCpf(cpf: string): Promise<Employee | null> {
        const user = await prisma.employee.findFirst({
            where: {
                cpf
            }
        })

        return user
    }

    public async findById(id: string, company_id: string): Promise<Employee | null> {
        const user = await prisma.employee.findFirst({
            where: {
                id,
                company_id
            }
        })

        return user
    }
}