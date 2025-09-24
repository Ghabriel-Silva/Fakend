import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatGaleryTable1758673660616 implements MigrationInterface {
    name = 'CreatGaleryTable1758673660616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`galery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`alt_description\` varchar(100) NOT NULL, \`width\` int NOT NULL, \`height\` int NOT NULL, \`url_full\` varchar(255) NOT NULL, \`url_small\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`phone\` varchar(30) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`person\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`person\` ADD \`phone\` varchar(20) NULL`);
        await queryRunner.query(`DROP TABLE \`galery\``);
    }

}
