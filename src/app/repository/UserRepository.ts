import User from "../entities/Users";
import { AppDataSource } from "../../database/dataSource";
import { IUserInput, IUserOutput, IUserPublic } from "../interfaces/IUser";
import { ITokenData } from "../interfaces/ILogin";

import { ILogin } from "../interfaces/ILogin";
import ErrorExtension from "../utils/ErrorExtensions";
import { formatSuccess } from "../utils/ReponseSuccess"
import { IResponseSuccess } from "../interfaces/IReponseSucess";
import bcrypt from "bcrypt"
import UserSchema from "../utils/validations/UserSchema";
import * as yup from "yup";
import Auth from "../utils/Auth";
import { MoreThan } from "typeorm";
import { addDays } from 'date-fns'; //Ela fornece funções prontas para manipular datas de forma imutável (ou seja, não altera a data original).


class UserRepository {
    private static userRepositoy = AppDataSource.getRepository(User)


    static getToEmail(email: string): Promise<IUserOutput | null> {
        return this.userRepositoy.findOneBy({ email })
    }

    static async loginVerification(loginData: ILogin): Promise<IResponseSuccess<string>> {
        const { email, password } = loginData

        if (!email || !password) throw new ErrorExtension(404, 'Missing email or password')

        const user = await this.getToEmail(email)

        if (!user?.password) {
            throw new ErrorExtension(401, "E-mail or password wrong")
        } else {
            const passwordVerificaton = await bcrypt.compare(password, user.password) // true / false
            if (!passwordVerificaton) throw new ErrorExtension(401, "E-mail or password wrong")
        }

        const payload: ITokenData = {
            userId: user.id,
            name: user.name,
            email: user.email
        }

        const auth = new Auth()
        const token = auth.JwtGenerator(payload)

        return formatSuccess(token, 'Login Efectuado with success')
    }

    static async newUser(dataCreate: IUserInput, ipAddress: string): Promise<IResponseSuccess<IUserOutput>> {
        try {
            //Primeiro valido os dados com Yup
            await UserSchema.validate(dataCreate, { abortEarly: false })

            //Verificando se n tenho email no banco de dados pois pe email unico

            

            //verificação de limite de criação por IP
            const countByIp = await this.userRepositoy.count({
                where: {
                    ip_address: ipAddress,
                    is_fake: false,
                    expires_at: MoreThan(new Date()) // apenas usuários ativos
                }
            })

            const MAX_USERS_PER_IP = 4
            if (countByIp >= MAX_USERS_PER_IP) {
                throw new ErrorExtension(400, "Limite de usuários criados por este IP atingido")
            }

            //Despois criptografo  a  senha
            const hashedPassword = await bcrypt.hash(dataCreate.password, 10)
            dataCreate.password = hashedPassword


            const userToSave = { //Spread operator, desestruturando objeto e e copiando sua propiedades para outro objeto
                ...dataCreate,
                is_fake: false,
                ip_address: ipAddress,
                expires_at: addDays(new Date(), 1) // expira em 1 dia
            }
            //depois coloco no banco de dados
            const createdUser = await this.userRepositoy.save(userToSave)
            return formatSuccess(createdUser, 'User created with success!')

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err;
        }
    }

    static async getUserBytoken(email: string): Promise<IResponseSuccess<IUserPublic>> {
        const user = await this.userRepositoy.findOneBy({ email })
        if (!user) throw new ErrorExtension(404, "User not found");

        const { password, ...userData } = user

        return formatSuccess(userData, "User data fetched successfully")
    }

}

export default UserRepository
