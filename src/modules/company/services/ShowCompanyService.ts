import {Company} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import { CompanyRepository } from "../repositories/CompanyRepository";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ShowCompanyService{
    public async execute(id: string, nivelLogin: string): Promise<Company>{

        verifyNivel(nivelLogin, "3")
        const companyRepository = new CompanyRepository()

        const company = await companyRepository.findById(id)

        if(!company){
            throw new AppError('Usuario não encontrado', 404)
        }

        return company
    }
}