import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../dataSource";
import { Galery } from "../../app/entities/Galery";
import generateFakeImages from "../seeders/GenerateFakeImages";

export class AddGaleryData1759166359997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const galeryImages = AppDataSource.getRepository(Galery)
        const listImage = await generateFakeImages(500)

        const saveReady = listImage.map(img => ({
            ...img,
            description: img.description ?? "No description",
            alt_description: img.alt_description ?? "No alt description"
        }))
        await galeryImages.save(saveReady)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await AppDataSource.getRepository(Galery).clear()
    }

}
