import { prisma } from "@database/PrismaClient";
import {Employee} from '@prisma/client'
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

interface IRequest {
    name: string;
    surname: string;
    birthday: Date;
    function: string;
    nivel: number;
    address: {
        street: string,
        number: string,
        city: string,
        district: string,
        complement?: string
        cep: string,
        state: string
    };
    numberphone: string;
    cpf: string;
    email: string;
    company_id: string

}

export class CreateEmployeeService {
    public async execute(data: IRequest, nivelLogin: string, company_id: string): Promise<Employee>{

        verifyNivel(nivelLogin, "3")

        const employeeRepository = new EmployeeRepository()


        const cpfExists = await employeeRepository.findByCpf(data.cpf)

        if(cpfExists !== null){
            throw new AppError('Ja existe um funcionario com esse cpf')
        }
        
        if(!data.company_id){
            data.company_id = company_id
        }

        const user = await prisma.employee.create({
            data
        })

        return user
        
    }
}