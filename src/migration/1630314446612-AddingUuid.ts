import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingUuid1630314446612 implements MigrationInterface {
    name = 'AddingUuid1630314446612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` ADD \`uuid\` char(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`user\` DROP COLUMN \`uuid\``);
    }

}
