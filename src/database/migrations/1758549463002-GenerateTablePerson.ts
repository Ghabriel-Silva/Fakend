import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTablePerson1758549463002 implements MigrationInterface {
    name = 'GenerateTablePerson1758549463002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(30) NOT NULL, \`username\` varchar(30) NOT NULL, \`gender\` enum ('male', 'female', 'other') NOT NULL DEFAULT 'other', \`age\` int NOT NULL, \`maritalStatus\` enum ('single', 'married', 'divorced', 'widowed', 'other') NOT NULL, \`imageUrl\` varchar(300) NOT NULL, \`country\` varchar(100) NOT NULL, \`state\` varchar(50) NOT NULL, \`city\` varchar(100) NOT NULL, \`profession\` varchar(150) NOT NULL, \`phone\` varchar(20) NULL, \`email\` varchar(150) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_d2d717efd90709ebd3cb26b936\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_d2d717efd90709ebd3cb26b936\` ON \`person\``);
        await queryRunner.query(`DROP TABLE \`person\``);
    }

}
