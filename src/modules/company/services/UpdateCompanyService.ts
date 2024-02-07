import { prisma } from "@database/PrismaClient";
import {Company} from "@prisma/client"
import { CompanyRepository } from "../repositories/CompanyRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";



interface IRequest {
    name?: string;
    opening_date?: Date;
    phone?: string;
    state_registration?: string;
    adress?: {
        street?: string,
        number?: string,
        city?: string,
        district?: string,
        complement?: string
        cep?: string,
        state?: string
    };
    numberphone?: string;
    cnpj?: string;
    email?: string;
    site?: string
}

export class UpdateCompanyService{
    public async execute(id: string, data: IRequest, nivelLogin: string): Promise<Company>{

        verifyNivel(nivelLogin, "3")
        
        const companyRepository = new CompanyRepository()

        const companyExist = await companyRepository.findById(id)



        if(!companyExist){
            throw new AppError('Usuario não encontrado', 404)
        }

        const company = await prisma.company.update({
            where: {
                id,
                
            },
            data: data
        })

        return company
    }
}