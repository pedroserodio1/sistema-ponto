import { prisma } from "@database/PrismaClient";
import {Employee} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ListEmployeesService{
    public async execute(nivelLogin: string, company_id: string): Promise<Employee[]>{

        verifyNivel(nivelLogin, "3")

        const employees = await prisma.employee.findMany({
            where: {
                company_id
            }
        })

        if(!employees){
            throw new AppError('Nenhum usuario encontrado', 404)
        }

        return employees
    }
}