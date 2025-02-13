import { MigrationInterface, QueryRunner } from "typeorm";

export class Addbuildingtable1739441705690 implements MigrationInterface {
    name = 'Addbuildingtable1739441705690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "building" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_bbfaf6c11f141a22d2ab105ee5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_57655499fbc0671a32732e6300" ON "building" ("name") `);
        await queryRunner.query(`ALTER TABLE "location" ADD "buildingId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665" FOREIGN KEY ("buildingId") REFERENCES "building"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_9d3c879ab8834dc2d6c46bb3665"`);
        await queryRunner.query(`ALTER TABLE "location" DROP COLUMN "buildingId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_57655499fbc0671a32732e6300"`);
        await queryRunner.query(`DROP TABLE "building"`);
    }

}
