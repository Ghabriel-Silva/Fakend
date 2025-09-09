import { Response, Request,Router } from "express";
import UserRepository from "../repository/UserRepository";
import AutenticationMiddleware from "../middlewares/AuthMiddleware";
import { IUserOutput } from "../interfaces/IUser";
import { IResponseSuccess } from "../interfaces/IReponseSucess";

class UserController {
    public router: Router

    constructor() {
        this.router = Router() // Recebo um objeto vazio Do tipo router onde minha rotas ficaram
        this.inicializeRoutes();
    }

    private inicializeRoutes(){
        this.router.post('/login', this.loginUser )
        this.router.get('/:id', AutenticationMiddleware,  this.getUsers)
        this.router.post('/',this.createdUser )
    }
    
    private async  loginUser(req:Request, res:Response){
        const verifyUser = await UserRepository.userVerification(req.body)
        res.status(200).json(verifyUser)
    }

    private async getUsers(req:Request, res:Response){
        const id = Number(req.params.id)
        const users = await UserRepository.getUserToEmail(id)
        res.status(200).json(users)
    }

    private async createdUser(req:Request, res:Response){
        const userCreated:IResponseSuccess<IUserOutput> = await UserRepository.newUser(req.body)
        res.status(200).json(userCreated)
    }
}
const userRouter = new UserController().router
export default userRouter