import { prisma } from "@database/PrismaClient";
import {Employee} from "@prisma/client"
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";



interface IRequest {
    name?: string;
    surname?: string;
    birthday?: Date;
    function?: string;
    nivel?: number;
    address?: {
        street: string,
        number: string,
        city: string,
        district: string,
        complement?: string
        cep: string,
        state: string
    };
    numberphone?: string;
    cpf?: string;
    email?: string;

}

export class UpdateEmployeeService{
    public async execute(id: string, data: IRequest, nivelLogin: string, company_id: string): Promise<Employee>{

        verifyNivel(nivelLogin, "3")
        
        const employeeRepository = new EmployeeRepository()

        const employeeExist = await employeeRepository.findById(id, company_id)



        if(!employeeExist){
            throw new AppError('Usuario não encontrado', 404)
        }

        const employee = await prisma.employee.update({
            where: {
                id,
                
            },
            data: data
        })

        return employee
    }
}