import {Employee} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import { EmployeeRepository } from "../repositories/EmployeeRepository";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ShowEmployeeService{
    public async execute(id: string, nivelLogin: string): Promise<Employee>{

        verifyNivel(nivelLogin, "3")
        const employeeRepository = new EmployeeRepository()

        const employee = await employeeRepository.findById(id)

        if(!employee){
            throw new AppError('Usuario não encontrado', 404)
        }

        return employee
    }
}