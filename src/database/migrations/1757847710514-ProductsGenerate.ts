import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductsGenerate1757847710514 implements MigrationInterface {
    name = 'ProductsGenerate1757847710514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(300) NOT NULL, \`sku\` varchar(30) NOT NULL, \`brand\` varchar(50) NOT NULL, \`category\` varchar(50) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`price_min\` decimal(10,2) NULL, \`stock\` int NOT NULL, \`color\` varchar(30) NULL, \`size\` varchar(20) NULL, \`image_url\` varchar(300) NULL, UNIQUE INDEX \`IDX_c44ac33a05b144dd0d9ddcf932\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_c44ac33a05b144dd0d9ddcf932\` ON \`products\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
