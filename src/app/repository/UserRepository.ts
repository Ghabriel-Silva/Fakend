import User from "../entities/Users";
import { AppDataSource } from "../../database/dataSource";
import { Repository } from "typeorm";

class UserRepository {
    private static userRepositoy = AppDataSource.getRepository(User)

    static async getUser(){
        return this.userRepositoy.find()
    }
}

export default UserRepository
