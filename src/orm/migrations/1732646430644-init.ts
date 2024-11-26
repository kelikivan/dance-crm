import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732646430644 implements MigrationInterface {
    name = 'Init1732646430644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."users" ("id" SERIAL NOT NULL, "phone" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "core"."users"`);
    }

}
