import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "../app/entities/Users"
import { Product } from "../app/entities/Products"
import { CreateUserTable1757162636821 } from "../database/migrations/1757162636821-CreateUserTable"
import { CreateSeedUsersTable1757166442235 } from "./migrations/1757166442235-CreateSeedUsersTable"
import { RenameBirthdateColunm1757168828987 } from "../database/migrations/1757168828987-RenameBirthdateColunm"
import { GenerateUsers1757513188814 } from "../database/migrations/1757513188814-generateUsers"
import { AddIsFakeAndExpiresAtToUsers1757600347289 } from "../database/migrations/1757600347289-AddIsFakeAndExpiresAtToUsers"
import { AddIPusuario1757601423333 } from "../database/migrations/1757601423333-AddIPusuario"
import { ProductsGenerate1757847710514 } from "../database/migrations/1757847710514-ProductsGenerate"
import { CreateColumsProducts1757848877069 } from "../database/migrations/1757848877069-CreateColumsProducts"
import { GenerateFakeProdutcs1757848363698 } from "../database/migrations/1757848363698-GenerateFakeProdutcs"
import { GenerateTablePerson1758549463002 } from "../database/migrations/1758549463002-GenerateTablePerson"
import { GenerateFakePerson1758562484175 } from "../database/migrations/1758562484175-GenerateFakePerson"
import { CreatGaleryTable1758673660616 } from "../database/migrations/1758673660616-CreatGaleryTable"
import { AddCollumToGalery1758740214518 } from "../database/migrations/1758740214518-AddCollumToGalery"
import { AddColumnCategory1758804333329 } from "../database/migrations/1758804333329-AddColumnCategory"
import { AlterTableDescrciption1758811693616 } from "../database/migrations/1758811693616-AlterTableDescrciption"
import { GenerateFakeImagens1758804549315 } from "../database/migrations/1758804549315-GenerateFakeImagens"
import { AddProducts1759164568016 } from "../database/migrations/1759164568016-AddProducts"
import { AddGaleryData1759166359997 } from "../database/migrations/1759166359997-AddGaleryData"
import { PopulandoGaleryData1759239430061 } from "../database/migrations/1759239430061-PopulandoGaleryData"




import dotenv from "dotenv"
import { Person } from "../app/entities/Persons"
import { Galery } from "../app/entities/Galery"
dotenv.config()

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as any,
    // url: process.env.DB_URL,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User, Product, Person, Galery],
    migrations: [
        CreateUserTable1757162636821,      // cria a tabela inicialmente
        RenameBirthdateColunm1757168828987, // renomeia a coluna
        CreateSeedUsersTable1757166442235, // cria um usuario inicial
        GenerateUsers1757513188814, //Gero 200 usuarios
        AddIsFakeAndExpiresAtToUsers1757600347289,// atualiza bd com novas colunas
        AddIPusuario1757601423333, //Adicionando coluna IP user
        ProductsGenerate1757847710514,//Gerando tabela de produtos
        CreateColumsProducts1757848877069, //Gerando colunas created_at e update_at
        GenerateFakeProdutcs1757848363698, //Gernado produtos fakes para popular a tabela
        GenerateTablePerson1758549463002, //Gerando Tabela Person
        GenerateFakePerson1758562484175, //Gerando dados falsos para person 
        CreatGaleryTable1758673660616,//Criando tabela galery
        AddCollumToGalery1758740214518, //Adicionando collumn category
        AddColumnCategory1758804333329,//Adicionando collumn subcategory
        AlterTableDescrciption1758811693616, // Alterando coluna description e description apra conter mais dados
        GenerateFakeImagens1758804549315, //Gerando Images fakes para teste
        AddProducts1759164568016, //Populando banco de dados products para teste e removendo todos dados da tabela
        AddGaleryData1759166359997, //Populando galery com dados
        PopulandoGaleryData1759239430061 //Populando Banco de dados Galery
    ],
    subscribers: [],
})
