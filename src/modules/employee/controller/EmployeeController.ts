import {Request, Response} from 'express'
import { CreateEmployeeService } from '../services/CreateEmployeeService'
import { UpdateEmployeeService } from '../services/UpdateEmployeeService'
import { ListEmployeesService } from '../services/ListEmployeeService'
import { ShowEmployeeService } from '../services/ShowEmployeeService'
import { DeleteEmployeeService } from '../services/DeleteEmployeeService'

export class EmployeeController {
    public async create(req: Request, res: Response): Promise<Response> {

        const createEmployee = new CreateEmployeeService()

        const data = req.body

        const nivelLogin = req.user.nivel
        
        const employee = await createEmployee.execute(data, nivelLogin)

        return res.status(202).json(employee)

    }

    public async update(req: Request, res: Response): Promise<Response>{
        const updateEmployee = new UpdateEmployeeService()

        const {id} = req.params
        const data = req.body

        const nivelLogin = req.user.nivel

        const employee = await updateEmployee.execute(id, data, nivelLogin)
        
        return res.status(204).json(employee)

    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listEmployee = new ListEmployeesService()

        const nivelLogin = req.user.nivel

        const employee = await listEmployee.execute(nivelLogin)

        return res.status(200).json(employee)
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const showEmployee = new ShowEmployeeService()

        const { id } = req.params

        const nivelLogin = req.user.nivel


        const user = await showEmployee.execute(id, nivelLogin)

        return res.status(200).json(user)
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const deleteEmployee = new DeleteEmployeeService()

        const {id} = req.params

        const nivelLogin = req.user.nivel
        
        await deleteEmployee.execute(id, nivelLogin)

        return res.status(204).json({})
    }


}