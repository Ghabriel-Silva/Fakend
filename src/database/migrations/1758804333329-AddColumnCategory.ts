import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCategory1758804333329 implements MigrationInterface {
    name = 'AddColumnCategory1758804333329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`subcategory\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`subcategory\``);
    }

}
