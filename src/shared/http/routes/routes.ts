import { Router } from 'express'

//instanciando rotas do express
const router = Router()

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

export default router

