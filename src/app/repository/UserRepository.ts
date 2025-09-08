import User from "../entities/Users";
import { AppDataSource } from "../../database/dataSource";
import { IUserInput, IUserOutput } from "../interfaces/IUser";
import { ILogin } from "../interfaces/ILogin";
import ErrorExtension from "../utils/ErrorExtensions";
import { formatSuccess } from "../utils/ReponseSuccess"
import { IResponseSuccess } from "../interfaces/IReponseSucess";
import bcrypt from "bcrypt"
import UserSchema from "../utils/validations/UserSchema";
import * as yup from "yup";
import Auth from "../utils/Auth";

class UserRepository {
    private static userRepositoy = AppDataSource.getRepository(User)

    static getToEmail(email: string): Promise<IUserOutput | null> {
        return this.userRepositoy.findOneBy({ email })
    }

    static async userVerification(loginData: ILogin): Promise<{ status: string }> {
        const { email, password } = loginData

        if (!email || !password) throw new ErrorExtension(404, 'Missing email or password')

        const user = await this.getToEmail(email)

        if (!user?.password) {
            throw new ErrorExtension(401, "E-mail or password wrong")
        } else {
            const passwordVerificaton = await bcrypt.compare(password, user.password)
            console.log(passwordVerificaton)
            if (!passwordVerificaton) throw new ErrorExtension(401, "E-mail or password wrong")
        }

        const payload = {
            name: user.name,
            email: user.email
        }

        const auth = new Auth()
        const token = auth.JwtGenerator(payload)

        return formatSuccess(token, 'Login Efectuado with success')
    }

    static async newUser(dataCreate: IUserInput): Promise<IResponseSuccess<IUserOutput>> {
        try {
            //Primeiro valido os dados com Yup
            await UserSchema.validate(dataCreate, { abortEarly: false })


            //Despois criptografo  a  senha
            const hashedPassword = await bcrypt.hash(dataCreate.password, 10)
            dataCreate.password = hashedPassword


            //depois coloco no banco de dados
            const createdUser = await this.userRepositoy.save(dataCreate)
            return formatSuccess(createdUser, 'User created with success!')

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err;
        }
    }

}

export default UserRepository
