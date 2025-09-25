import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableDescrciption1758811693616 implements MigrationInterface {
    name = 'AlterTableDescrciption1758811693616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`description\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`alt_description\``);
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`alt_description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`alt_description\``);
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`alt_description\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`description\` varchar(100) NOT NULL`);
    }

}
