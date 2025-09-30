import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../dataSource";
import { Galery } from "../../app/entities/Galery";
import generateFakeImages from "../seeders/GenerateFakeImages";


export class PopulandoGaleryData1759239430061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  const galeryImages = AppDataSource.getRepository(Galery)
        const listImage = await generateFakeImages(1000)

        const saveReady = listImage.map(img => ({
            ...img,
            description: img.description ?? "No description",
            alt_description: img.alt_description ?? "No alt description"
        }))
        await galeryImages.save(saveReady)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
