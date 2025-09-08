import { Response, Request,Router } from "express";
import UserRepository from "../repository/UserRepository";


class UserController {
    public router: Router

    constructor() {
        this.router = Router() // Recebo um objeto vazio Do tipo router onde minha rotas ficaram
        this.inicializeRoutes();
    }

    private inicializeRoutes(){
        this.router.get('/', this.getUsers)
        this.router.post('/',this.createdUser )
    }

    private async getUsers(req:Request, res:Response){
        const users = await UserRepository.userVerification(req.body)
        res.status(200).json(users)
    }

    private async createdUser(req:Request, res:Response){
        const userCreated = await UserRepository.newUser(req.body)
        res.status(200).json(userCreated)
    }
}
const userRouter = new UserController().router
export default userRouter