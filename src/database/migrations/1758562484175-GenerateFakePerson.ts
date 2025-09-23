import { MigrationInterface, QueryRunner } from "typeorm";
import geraFakePersons from "../seeders/GenerateFakePersons";
import { AppDataSource } from "../dataSource";
import { Person } from "../../app/entities/Persons";


export class GenerateFakePerson1758562484175 implements MigrationInterface {

    public async up(): Promise<void> {
        const userRepository = AppDataSource.getRepository(Person)
        const persons = await geraFakePersons(1000)
        await userRepository.save(persons)
    }

    public async down(): Promise<void> {
        await AppDataSource.getRepository(Person).clear();
    }

}
