import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/Users"
import { CreateUserTable1757162636821 } from "../database/migrations/1757162636821-CreateUserTable"
import { CreateSeedUsersTable1757166442235 } from "./migrations/1757166442235-CreateSeedUsersTable"
import { RenameBirthdateColunm1757168828987 } from "../database/migrations/1757168828987-RenameBirthdateColunm"
import { GenerateUsers1757513188814 } from "../database/migrations/1757513188814-generateUsers"
import { AddIsFakeAndExpiresAtToUsers1757600347289 } from "../database/migrations/1757600347289-AddIsFakeAndExpiresAtToUsers"
import { AddIPusuario1757601423333 } from "../database/migrations/1757601423333-AddIPusuario"


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
        CreateSeedUsersTable1757166442235, // cria um usuario inicial
        GenerateUsers1757513188814, //Gero 200 usuarios
        AddIsFakeAndExpiresAtToUsers1757600347289,// atualiza bd com novas colunas
        AddIPusuario1757601423333
    ],
    subscribers: [],
})
