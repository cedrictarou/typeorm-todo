import {MigrationInterface, QueryRunner} from "typeorm";

export class Todomigration1629237489113 implements MigrationInterface {
    name = 'Todomigration1629237489113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`isDone\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`test\`.\`todo\``);
    }

}
