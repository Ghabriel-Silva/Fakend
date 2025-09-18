import { Response, Request, Router } from "express";
import UserRepository from "../repository/UserRepository";
import AutenticationMiddleware from "../middlewares/AuthMiddleware";
import ErrorExtension from "../utils/ErrorExtensions";
import { ITokenData } from "../interfaces/ILogin";
import { IEditeUser } from "../interfaces/IEditeUser";
import { IChangePassword } from "../interfaces/IChangePassword";


class UserController {
    public router: Router

    constructor() {
        this.router = Router() // Recebo um objeto vazio Do tipo router onde minha rotas ficaram
        this.inicializeRoutes();
    }

    private inicializeRoutes() {
        this.router.get('/me', AutenticationMiddleware, this.getInfoUser)// Pego dados do usuário com base no token 
        this.router.delete('/delete', AutenticationMiddleware, this.deleteUser)
        this.router.put('/edite', AutenticationMiddleware, this.editeUser)
        this.router.patch('/edite/password', AutenticationMiddleware, this.editePassword)
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

    private async deleteUser(req: Request, res: Response) {
        const deleteUser: ITokenData = req.user as ITokenData
        if (!deleteUser) throw new ErrorExtension(401, "Token not provided");

        const UserDeletado = await UserRepository.deleteUserByToken(deleteUser)
        return res.status(200).json(UserDeletado)
    }

    private async editeUser(req: Request, res: Response) {
        const editeData: IEditeUser = req.body
        const userToken: ITokenData = req.user as ITokenData

        if (!userToken?.email) {
            throw new ErrorExtension(401, "Token not provided");
        }

        const userEditdado = await UserRepository.editeUser(userToken.email, editeData)

        res.status(200).json(userEditdado)
    }

    private async editePassword(req: Request, res: Response) {
        const email:string | undefined = req.user?.email
        const changePassaword:IChangePassword = req.body
        
        const resultPassword = await UserRepository.editePassword(email, changePassaword)

        res.status(200).json(resultPassword)
    }


}
const userRouter = new UserController().router
export default userRouter