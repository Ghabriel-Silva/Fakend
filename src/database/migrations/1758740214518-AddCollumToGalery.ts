import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCollumToGalery1758740214518 implements MigrationInterface {
    name = 'AddCollumToGalery1758740214518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` ADD \`category\` varchar(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`galery\` DROP COLUMN \`category\``);
    }

}
