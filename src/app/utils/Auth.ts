import Jwt, { SignOptions } from "jsonwebtoken";
import { ITokenData } from "../interfaces/User/ILogin";
import ErrorExtension from "./ErrorExtensions";
import dotenv from "dotenv"
dotenv.config()


const SECRET = process.env.JWT_SECRET as string
const jwtDefaultConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
}



class Auth {
    constructor(private jwtConfig?: SignOptions) { //Se existir jwtConfig → usa a que você passou.
        if (!jwtConfig) { 
            this.jwtConfig = jwtDefaultConfig //Se não existir → define this.jwtConfig = jwtDefaultConfig.
        }
    }

    public JwtGenerator(payload: ITokenData) {
        return Jwt.sign(payload, SECRET, this.jwtConfig)
    }

    public AuthenticateToken(token: string) {
        if (!token) {
            throw new ErrorExtension(401, "Token Not Found")
        }

        try{
            // Jwt.verify valida o token e retorna o payload contido nele
            const validateJwt = Jwt.verify(token, SECRET)
            return validateJwt // validateJwt contém o payload: { name, email, iat, exp }
        } catch (erro){
            throw new ErrorExtension(401, "Token Not Found")
        }
    }
}

export default Auth