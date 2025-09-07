import { Response, Request,Router } from "express";
import UserRepository from "../repository/UserRepository";

class UserController {
    public router: Router

    constructor() {
        this.router = Router() // Recebo um objeto vazio Do tipo router onde minha rotas ficaram
        this.inicializeRoutes();
    }

    private inicializeRoutes(){
        this.router.get('/', this.getAllUsers)
    }

    private async getAllUsers(req:Request, res:Response){
        const users = await UserRepository.getUser()

        res.status(200).json(users)
    }
}
const userRouter = new UserController().router
export default userRouter