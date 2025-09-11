import { Response, Request, Router } from "express";
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

    private inicializeRoutes() {
        this.router.post('/login', this.loginUser)
        this.router.get('/me', AutenticationMiddleware, this.getInfoUser)// Pego dados do usuário com base no token 
        this.router.post('/register', this.createdUser)
        this.router.delete('/delete', AutenticationMiddleware, this.deleteUser)
    }

    private async loginUser(req: Request, res: Response) {
        const verifyUser = await UserRepository.loginVerification(req.body)
        res.status(200).json(verifyUser)
    }


    private async createdUser(req: Request, res: Response) {
        const ipAddress = req.ip || "0.0.0.0" // fallback caso req.ip seja undefined

        const userCreated: IResponseSuccess<IUserOutput> = await UserRepository.newUser(req.body, ipAddress )
        res.status(200).json(userCreated)
    }

    private async getInfoUser(req: Request, res: Response) {
        try {
            const email = req.user?.email;
            if (!email) return res.status(400).json({ status: "error", message: "User not found in token" })

            const user = await UserRepository.getUserBytoken(email)

            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }

    private async deleteUser(req:Request, res:Response){
       return res.status(200).json({mensage:"requsição puxando"})
    }
}
const userRouter = new UserController().router
export default userRouter