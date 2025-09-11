import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIPusuario1757601423333 implements MigrationInterface {
    name = 'AddIPusuario1757601423333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`ip_address\` varchar(45) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`ip_address\``);
    }

}
