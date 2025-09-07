import { MigrationInterface, QueryRunner } from "typeorm";
import User from "../../app/entities/Users";
import { AppDataSource } from "../dataSource";
import useSeed from "../seeders/UseSeed";


export class CreateSeedUsersTable1757166442235 implements MigrationInterface {

    public async up(): Promise<void> {
        const userRepository = AppDataSource.getRepository(User)

        await userRepository.save(useSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
