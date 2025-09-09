import { NextFunction, Request, Response } from "express"

import Auth from "../utils/Auth"



const AutenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || ""
    const auth = new Auth()

    try {
        const payload = auth.AuthenticateToken(token)
        if (payload) {
            next() // token válido → passa para o controller
        }
    } catch (err) {
        res.status(401).json({ status: "error", message: "Invalid or missing token" })
    }
}

export default AutenticationMiddleware