import User from "../entities/Users";
import { AppDataSource } from "../../database/dataSource";
import { Repository } from "typeorm";
import { IUserInput, IUserOutput} from "../interfaces/IUser";

class UserRepository {
    private static userRepositoy = AppDataSource.getRepository(User)

    static async getUser(){
        return this.userRepositoy.find()
    }

    static async newUser(dataCreate:IUserInput):Promise<IUserOutput>{
        const createdUser = await this.userRepositoy.save(dataCreate)
        return createdUser
    }


}

export default UserRepository
