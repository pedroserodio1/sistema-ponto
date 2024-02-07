import {Request, Response} from 'express'
import { CreateCompanyService } from '../services/CreateCompanyService'
import { UpdateCompanyService } from '../services/UpdateCompanyService'
import { ListCompanysService } from '../services/ListCompanyService'
import { ShowCompanyService } from '../services/ShowCompanyService'
import { DeleteCompanyService } from '../services/DeleteCompanyService'

export class CompanyController {
    public async create(req: Request, res: Response): Promise<Response> {

        const createCompany = new CreateCompanyService()

        const data = req.body

        const nivelLogin = req.user.nivel
        
        const company = await createCompany.execute(data, nivelLogin)

        return res.status(202).json(company)

    }

    public async update(req: Request, res: Response): Promise<Response>{
        const updateCompany = new UpdateCompanyService()

        const {id} = req.params
        const data = req.body

        const nivelLogin = req.user.nivel

        const company = await updateCompany.execute(id, data, nivelLogin)
        
        return res.status(204).json(company)

    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listCompany = new ListCompanysService()

        const nivelLogin = req.user.nivel

        const company = await listCompany.execute(nivelLogin)

        return res.status(200).json(company)
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const showCompany = new ShowCompanyService()

        const { id } = req.params

        const nivelLogin = req.user.nivel


        const company = await showCompany.execute(id, nivelLogin)

        return res.status(200).json(company)
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const deleteCompany = new DeleteCompanyService()

        const {id} = req.params

        const nivelLogin = req.user.nivel
        
        await deleteCompany.execute(id, nivelLogin)

        return res.status(204).json({})
    }


}