import { NextFunction, Request, Response } from "express"
import { ITokenData } from "../interfaces/User/ILogin";

import Auth from "../utils/Auth"

declare global {
    namespace Express {
        interface Request {
            user?: ITokenData;
        }
    }
}


const AutenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || ""
    const auth = new Auth()

    if (!token) {
        return res.status(401).json({ status: "error", message: "Token not provided" });
    }


    try {
        const payload = auth.AuthenticateToken(token) as ITokenData //Confia em mim, o valor retornado por AuthenticateToken tem o tipo ITokenData
        req.user = payload; // armazena o payload para o controller // { userId, name, email }
        next(); // token válido → passa para o controller
    } catch (err) {
        res.status(401).json({ status: "error", message: "Invalid or missing token" })
    }
}

export default AutenticationMiddleware