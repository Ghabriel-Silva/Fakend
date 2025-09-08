import Jwt, { SignOptions } from "jsonwebtoken";
import { ITokenData } from "../interfaces/ILogin";
import ErrorExtension from "./ErrorExtensions";

const SECRET = 'senhasecreta'

const jwtDefaultConfig: SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
}



class Auth {
    constructor(private jwtConfig?: SignOptions) {
        if (!jwtConfig) {
            this.jwtConfig = jwtDefaultConfig
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
            const validateJwt = Jwt.verify(token, SECRET)
            return validateJwt
        } catch (erro){
            throw new ErrorExtension(401, "Token Not Found")
        }
    }
}

export default Auth