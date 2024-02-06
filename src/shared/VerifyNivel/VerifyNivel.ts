import { AppError } from "@shared/AppError/AppError";

export default function verifyNivel(nivelLogin: string, nivel: string){

    if(nivelLogin.toString() >= nivel){
        throw new AppError("Seu nivel não é autorizado para realizar essa operação", 401)
    }
}