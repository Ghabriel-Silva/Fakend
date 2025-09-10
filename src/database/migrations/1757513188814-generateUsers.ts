import { MigrationInterface, QueryRunner } from "typeorm";
import User from "../../app/entities/Users";
import { AppDataSource } from "../dataSource";
import generateFakeUsers from "../seeders/GenerateFakeUsers";


export class GenerateUsers1757513188814 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepository = AppDataSource.getRepository(User);
        const users = await generateFakeUsers(200); 
        await userRepository.save(users);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM users`);
    }

}
