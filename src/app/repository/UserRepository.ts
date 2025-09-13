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
import UserSchemaEdite from "../utils/validations/UserSchemaEdite";
import UserSchemaPassword from "../utils/validations/UserSchemaPassword";
import * as yup from "yup";
import Auth from "../utils/Auth";
import { MoreThan } from "typeorm";
import { addDays } from 'date-fns'; //Ela fornece funções prontas para manipular datas de forma imutável (ou seja, não altera a data original).
import { IEditeUser } from "../interfaces/IEditeUser";
import { IChangePassword } from "../interfaces/IChangePassword";


class UserRepository {
    private static userRepository = AppDataSource.getRepository(User)


    static getToEmail(email: string): Promise<IUserOutput | null> {
        return this.userRepository.findOneBy({ email })
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

            //Verificando se n tenho email no banco de dados pois o email unico
            const email: string = dataCreate.email
            const emailDb = await this.userRepository.findOneBy({ email })

            if (emailDb) {
                throw new ErrorExtension(401, "Email alrary in data base")
            }

            //verificação de limite de criação por IP
            const countByIp = await this.userRepository.count({
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
            const createdUser = await this.userRepository.save(userToSave)
            return formatSuccess(createdUser, 'User created with success!')

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(","))
            }
            throw err;
        }
    }

    static async getUserBytoken(email: string): Promise<IResponseSuccess<IUserPublic>> {
        const user = await this.userRepository.findOneBy({ email })
        if (!user) throw new ErrorExtension(404, "User not found");

        const { password, ...userData } = user

        return formatSuccess(userData, "User data fetched successfully")
    }


    static async deleteUserByToken(deleteUser: ITokenData): Promise<IResponseSuccess<null>> {
        const { email } = deleteUser
        if (!email) {
            throw new ErrorExtension(400, "Email required in token")
        }

        const result = await this.userRepository
            .createQueryBuilder()
            .delete()
            .from(User)
            .where("email = :email", { email })
            .andWhere("is_fake = :isFake", { isFake: false })
            .execute();


        if (result.affected === 0) {
            throw new ErrorExtension(404, "This account can´t be deleted");
        }
        return formatSuccess(null, "User deleted successfully")
    }



    // Editando usuário
    static async editeUser(email: string, dataEdite: IEditeUser): Promise<IResponseSuccess<null>> {
        try {
            await UserSchemaEdite.validate(dataEdite, { abortEarly: false })

            const user = await this.userRepository.findOneBy({ email });
            if (!user) {
                throw new ErrorExtension(404, "User not found");
            }

            if (user?.is_fake === true) {
                throw new ErrorExtension(400, "You can't edit this account")
            }

            const dataToUpdate: Partial<IEditeUser> = {};

            if (dataEdite.name !== undefined && dataEdite.name !== user.name) {
                dataToUpdate.name = dataEdite.name;
            }
            if (dataEdite.last_name !== undefined && dataEdite.last_name !== user.last_name) {
                dataToUpdate.last_name = dataEdite.last_name;
            }
            if (dataEdite.sexo !== undefined && dataEdite.sexo !== user.sexo) {
                dataToUpdate.sexo = dataEdite.sexo;
            }


            if (dataEdite.birth_date !== undefined) {
                dataToUpdate.birth_date = dataEdite.birth_date;
            }

            if (Object.keys(dataToUpdate).length === 0) {
                return formatSuccess(null, "No changes detected");
            }

            await this.userRepository.save({ ...user, ...dataToUpdate }); //pega todos os campos do usuário que você buscou no banco. ...dataToUpdate sobrepõe apenas os campos que você quer atualizar

            return formatSuccess(null, "User edited successfully");

        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(", "))
            }
            throw err
        }
    }

    static async editePassword(email: string | undefined, changePassaword: IChangePassword) {
        try {
            await UserSchemaPassword.validate(changePassaword, { abortEarly: false })
            const { currentPassword, newPassword } = changePassaword

            if (!email) {
                throw new Error("Email is required");
            }

            const user = await this.userRepository.findOne({
                select: ["id", "password"],
                where: {
                    email: email,
                    is_fake: false
                }

            })

            if (!user) {
                throw new ErrorExtension(
                    404,
                    "You can't change this password because it's a fake test account");
            }

            const isSamePassword = await bcrypt.compare(newPassword, user?.password);
            if (isSamePassword) {
                throw new ErrorExtension(
                    401,
                    "The new password cannot be the same as the last one");
            }

            const isPasswordValid: boolean = await bcrypt.compare(currentPassword, user.password)

            if (!isPasswordValid) {
                throw new ErrorExtension(401, "Current password is incorrect")
            }

            const hashedPassword: string = await bcrypt.hash(newPassword, 10)

            await this.userRepository.update(
                { id: user.id, email: email },
                { password: hashedPassword }
            )

            return formatSuccess(null, 'Password Edite with success!')
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                throw new ErrorExtension(400, err.errors.join(", "))
            }
            throw err
        }

    }
}

export default UserRepository
