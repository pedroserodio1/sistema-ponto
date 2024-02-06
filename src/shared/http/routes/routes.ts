import { Router } from 'express'

//instanciando rotas do express
const router = Router()

//importação dos arquivos de rotas
import userRouter from '@modules/User/routes/user.routes'
import clockRouter from '@modules/Clock/routes/clock.routes'

//Criação de rota padrão para o projeto
router.get('/', (req, res) => {

    return res.json({
        author: 'Pedro Serôdio',
        description: 'Sistema para marcação de horario de um funcionario, tambem conhecido como ponto',
        contact: {
            twitter: 'https://twitter.com/pedroserodio',
            github: 'https://github.com/pedroserodio1',
            linkedin: 'https://www.linkedin.com/in/pedroserodio1/'
        },
        version: '1.0.0'
    })
})

//utilização das rotas do modulos
router.use('/user', userRouter)
router.use('/clock', clockRouter)
router.use('/employee', employeeRoute)

export default router

