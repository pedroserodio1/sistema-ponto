import { prisma } from "@database/PrismaClient";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class DeleteCompanyService{
    public async execute(id: string, nivelLogin: string): Promise<void> {

        verifyNivel(nivelLogin, "3")
        const companyRepository = new CompanyRepository()

        const companyExists = await companyRepository.findById(id)

        if(!companyExists){
            throw new AppError('Empresa não encontrada', 404)
        }

        await prisma.company.delete({
            where: {
                id
            }
        })
    }
}