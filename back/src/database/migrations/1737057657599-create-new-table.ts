import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1737057657599 implements MigrationInterface {
    name = 'CreateNewTable1737057657599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entities" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "tooltip" character varying NOT NULL, "sum" integer NOT NULL, "categoryId" integer, CONSTRAINT "PK_8640855ae82083455cbb806173d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "income" ("id" SERIAL NOT NULL, "datum" TIMESTAMP NOT NULL, CONSTRAINT "PK_29a10f17b97568f70cee8586d58" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "incomeId" integer, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "entities" ADD CONSTRAINT "FK_6c7eda02e54a519b8209daeca29" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_5a900137d037399e0780ea59ece" FOREIGN KEY ("incomeId") REFERENCES "income"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_5a900137d037399e0780ea59ece"`);
        await queryRunner.query(`ALTER TABLE "entities" DROP CONSTRAINT "FK_6c7eda02e54a519b8209daeca29"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "income"`);
        await queryRunner.query(`DROP TABLE "entities"`);
    }

}
