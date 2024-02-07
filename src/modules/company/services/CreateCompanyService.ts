import { prisma } from "@database/PrismaClient";
import {Company} from '@prisma/client'
import { CompanyRepository } from "../repositories/CompanyRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

interface IRequest {
    name: string;
    opening_date: Date;
    phone: string;
    state_registration: string;
    adress: {
        street: string,
        number: string,
        city: string,
        district: string,
        complement?: string
        cep: string,
        state: string
    };
    numberphone: string;
    cnpj: string;
    email: string;
    site: string

}

export class CreateCompanyService {
    public async execute(data: IRequest, nivelLogin: string): Promise<Company>{

        verifyNivel(nivelLogin, "2")

        const companyRepository = new CompanyRepository()


        const cnpjExists = await companyRepository.findByCnpj(data.cnpj)

        if(cnpjExists !== null){
            throw new AppError('Ja existe uma empresa com esse cnpj')
        }



        const company = await prisma.company.create({
            data
        })

        return company
        
    }
}