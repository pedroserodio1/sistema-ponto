import { prisma } from "@database/PrismaClient";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class DeleteEmployeeService{
    public async execute(id: string, nivelLogin: string): Promise<void> {

        verifyNivel(nivelLogin, "3")
        const employeeRepository = new EmployeeRepository()

        const userExists = await employeeRepository.findById(id)

        if(!userExists){
            throw new AppError('Funcionario não encontrado', 404)
        }

        await prisma.employee.delete({
            where: {
                id
            }
        })
    }
}