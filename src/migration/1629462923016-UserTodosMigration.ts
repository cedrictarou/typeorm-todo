import {MigrationInterface, QueryRunner} from "typeorm";

export class UserTodosMigration1629462923016 implements MigrationInterface {
    name = 'UserTodosMigration1629462923016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`todo\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`test\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`todo\` DROP COLUMN \`userId\``);
    }

}
