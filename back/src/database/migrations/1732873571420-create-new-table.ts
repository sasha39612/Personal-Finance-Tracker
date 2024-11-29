import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNewTable1732873571420 implements MigrationInterface {
  name = 'CreateNewTable1732873571420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."project_projecttype_enum" AS ENUM('internal', 'global', 'startup')`,
    );
    await queryRunner.query(
      `CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "overview" character varying NOT NULL, "description" character varying NOT NULL, "isFinished" boolean NOT NULL, "projectType" "public"."project_projecttype_enum" NOT NULL DEFAULT 'internal', CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "technology" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "tag" character varying NOT NULL, CONSTRAINT "PK_89f217a9ebf9b4bc1a0d74883ec" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "technology"`);
    await queryRunner.query(`DROP TABLE "project"`);
    await queryRunner.query(`DROP TYPE "public"."project_projecttype_enum"`);
  }
}
