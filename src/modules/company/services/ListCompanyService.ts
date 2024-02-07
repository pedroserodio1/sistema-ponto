import { prisma } from "@database/PrismaClient";
import {Company} from "@prisma/client"
import { AppError } from "@shared/AppError/AppError";
import verifyNivel from "@shared/VerifyNivel/VerifyNivel";

export class ListCompanysService{
    public async execute(nivelLogin: string): Promise<Company[]>{

        verifyNivel(nivelLogin, "2")

        const companys = await prisma.company.findMany()

        if(!companys){
            throw new AppError('Nenhuma empresa encontrada', 404)
        }

        return companys
    }
}