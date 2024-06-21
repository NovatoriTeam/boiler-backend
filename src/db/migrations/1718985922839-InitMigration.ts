import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1718985922839 implements MigrationInterface {
  name = 'InitMigration1718985922839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, "shop" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."user_role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "role" "boiler-plate"."user_role_role_enum" NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL DEFAULT '$2b$10$6g/j6shYY5cwPgBdO2T1CO9Ut8OymKyFIRAKFMjzh2FE8a1c050da', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."task_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."refresh" ("refreshToken" character varying NOT NULL, "userId" integer NOT NULL, "expirationDate" TIMESTAMP NOT NULL DEFAULT '"2024-07-05T16:05:24.435Z"', CONSTRAINT "PK_42bbec5870ff44e48b314f3e792" PRIMARY KEY ("refreshToken"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1851fd91666a76c48ab570b5a1" ON "boiler-plate"."refresh" ("refreshToken", "userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ADD CONSTRAINT "FK_b39e4ed3bfa789758e476870ec2" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" DROP CONSTRAINT "FK_b39e4ed3bfa789758e476870ec2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_1851fd91666a76c48ab570b5a1"`,
    );
    await queryRunner.query(`DROP TABLE "boiler-plate"."refresh"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."task_entity"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."users"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."user_role"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."products"`);
  }
}
