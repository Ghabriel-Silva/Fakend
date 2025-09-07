import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/Users"
import { CreateUserTable1757162636821 } from "../database/migrations/1757162636821-CreateUserTable"
import { CreateSeedUsersTable1757166442235 } from "../database/migrations/1757166442235-CreateSeedUsersTable"
import { RenameBirthdateColunm1757168828987 } from "../database/migrations/1757168828987-RenameBirthdateColunm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "@Gs189970",
    database: "crud_users",
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [
        CreateUserTable1757162636821,      // cria a tabela inicialmente
        RenameBirthdateColunm1757168828987, // renomeia a coluna
        CreateSeedUsersTable1757166442235,
    ],
    subscribers: [],
})
