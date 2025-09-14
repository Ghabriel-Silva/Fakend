import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateColumsProducts1757848877069 implements MigrationInterface {
    name = 'CreateColumsProducts1757848877069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`updadet_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`updadet_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`created_at\``);
    }

}
