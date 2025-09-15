import { MigrationInterface, QueryRunner } from "typeorm";
import ProductsGenerate from "../seeders/GenerateFakeProducts";
import { AppDataSource } from "../dataSource";
import { Product } from "../../app/entities/Products";

export class GenerateFakeProdutcs1757848363698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = AppDataSource.getRepository(Product)
        const products = await ProductsGenerate(100)
        await userRepository.save(products)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await AppDataSource.getRepository(Product).clear();

    }

}
