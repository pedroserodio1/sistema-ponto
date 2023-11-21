import {Request, Response} from 'express'
import { CreateUserService } from '../services/CreateUserService'
import { UpdateUserService } from '../services/UpdateUserService'
import { ListUsersService } from '../services/ListUsersService'
import { ShowUsersService } from '../services/ShowUserService'
import { DeleteUserService } from '../services/DeleteUserService'
import { LoginUserService } from '../services/LoginUserService'

export class UserController {
    public async create(req: Request, res: Response): Promise<Response> {

        const createUser = new CreateUserService()

        const data = req.body

        data.user_create = req.user.id
        data.user_update = req.user.id
        
        const user = await createUser.execute(data)

        return res.status(202).json(user)

    }

    public async update(req: Request, res: Response): Promise<Response>{
        const updateUser = new UpdateUserService()

        const {id} = req.params
        const data = req.body

        const user = await updateUser.execute(id, data)
        
        return res.status(204).json(user)

    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listUsers = new ListUsersService()


        const users = await listUsers.execute()

        return res.status(200).json(users)
    }

    public async show(req: Request, res: Response): Promise<Response>{
        const showUser = new ShowUsersService()

        const { id } = req.params

        const user = await showUser.execute(id)

        return res.status(200).json(user)
    }

    public async delete(req: Request, res: Response): Promise<Response>{
        const deleteUser = new DeleteUserService()

        const {id} = req.params
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const user = await deleteUser.execute(id)

        return res.status(204).json({})
    }

    public async login(req: Request, res: Response): Promise<Response>{
        const sessionService = new LoginUserService();

        const data = req.body;

        const session = await sessionService.execute(data);

        return res.status(202).json(session);
    }
}