import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameBirthdateColunm1757168828987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn('users', 'birth date', 'birth_date')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.renameColumn('users', 'birth_date', 'birth date')
    }

}
