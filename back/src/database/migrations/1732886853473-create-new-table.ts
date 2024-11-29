import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewTable1732886853473 implements MigrationInterface {
    name = 'CreateNewTable1732886853473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technology_projects_project" ("technologyId" integer NOT NULL, "projectId" integer NOT NULL, CONSTRAINT "PK_37678eb206e5b85c837548528e4" PRIMARY KEY ("technologyId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abaca3322e78ea90311263c584" ON "technology_projects_project" ("technologyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_41b166c61550257203f3ab07af" ON "technology_projects_project" ("projectId") `);
        await queryRunner.query(`ALTER TABLE "technology_projects_project" ADD CONSTRAINT "FK_abaca3322e78ea90311263c584e" FOREIGN KEY ("technologyId") REFERENCES "technology"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "technology_projects_project" ADD CONSTRAINT "FK_41b166c61550257203f3ab07af3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "technology_projects_project" DROP CONSTRAINT "FK_41b166c61550257203f3ab07af3"`);
        await queryRunner.query(`ALTER TABLE "technology_projects_project" DROP CONSTRAINT "FK_abaca3322e78ea90311263c584e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41b166c61550257203f3ab07af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abaca3322e78ea90311263c584"`);
        await queryRunner.query(`DROP TABLE "technology_projects_project"`);
    }

}
