import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToLocation1739439869404 implements MigrationInterface {
    name = 'AddUniqueConstraintToLocation1739439869404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f0336eb8ccdf8306e270d400cf" ON "location" ("name") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f0336eb8ccdf8306e270d400cf"`);
    }

}
