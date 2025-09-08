import { NextFunction, Request, Response } from "express"

import Auth from "../utils/Auth"

const AutenticationMiddleware = async(req:Request, res:Response, next:NextFunction) =>{
    const token = req.headers.authorization || ""
    const auth = new Auth()

    auth.AuthenticateToken(token)
    next()
}

export default AutenticationMiddleware