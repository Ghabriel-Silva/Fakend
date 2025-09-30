import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../dataSource";
import Product from "../../app/entities/Products";
import ProductsGenerate from "../seeders/GenerateFakeProducts";

export class AddProducts1759164568016 implements MigrationInterface {

    public async up(): Promise<void> {
        const productsRepository = AppDataSource.getRepository(Product)
        const productsData = await ProductsGenerate(1000)
        await productsRepository.save(productsData)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await AppDataSource.getRepository(Product).clear()
    }

}
