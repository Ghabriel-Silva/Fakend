import { Response, Request, Router } from "express";
import UserRepository from "../repository/UserRepository";
import { IUserOutput } from "../interfaces/User/IUser";
import { IResponseSuccess } from "../interfaces/User/IReponseSucess";


class AuthControler {
    public router: Router
    constructor() {
        this.router = Router()
        this.inicializeRoutes();
    }

    private inicializeRoutes() {
        this.router.post('/login', this.loginUser)
        this.router.post('/register', this.createdUser)
    }


    private async loginUser(req: Request, res: Response) {
        const verifyUser = await UserRepository.loginVerification(req.body)
        res.status(200).json(verifyUser)
    }
    private async createdUser(req: Request, res: Response) {
        const ipAddress = req.ip || "0.0.0.0" // fallback caso req.ip seja undefined

        const userCreated: IResponseSuccess<IUserOutput> = await UserRepository.newUser(req.body, ipAddress)
        res.status(200).json(userCreated)
    }


}

const AuthRouter = new AuthControler().router
export default AuthRouter