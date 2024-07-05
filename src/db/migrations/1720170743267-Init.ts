import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1720170743267 implements MigrationInterface {
  name = 'Init1720170743267';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."products" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "price" integer NOT NULL, "shop" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."user_role" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" "boiler-plate"."user_role_name_enum" NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL DEFAULT '$2b$10$9w4vnzyigriILyTDhRpBR.hwB0uc4Mfs.rvtZpvVFtYrK6q7HrRl.', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."task_entity" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_0385ca690d1697cdf7ff1ed3c2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."department" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "manager" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."employee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "hireDate" TIMESTAMP NOT NULL, "jobTitle" character varying NOT NULL, "salary" numeric(10,2) NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text NOT NULL, "budget" numeric(10,2) NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."refresh" ("refreshToken" character varying NOT NULL, "userId" integer NOT NULL, "expirationDate" TIMESTAMP NOT NULL DEFAULT '"2024-07-19T09:12:24.385Z"', CONSTRAINT "PK_42bbec5870ff44e48b314f3e792" PRIMARY KEY ("refreshToken"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1851fd91666a76c48ab570b5a1" ON "boiler-plate"."refresh" ("refreshToken", "userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."project_employees_employee" ("projectId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_c899c11afd52f30002dc8ccc0cc" PRIMARY KEY ("projectId", "employeeId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f60a620feca36927331cc2f12" ON "boiler-plate"."project_employees_employee" ("projectId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_615f6cc16e65ad2d177bb099cb" ON "boiler-plate"."project_employees_employee" ("employeeId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."products" ADD CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" ADD CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "boiler-plate"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ADD CONSTRAINT "FK_b39e4ed3bfa789758e476870ec2" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project_employees_employee" ADD CONSTRAINT "FK_8f60a620feca36927331cc2f12a" FOREIGN KEY ("projectId") REFERENCES "boiler-plate"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project_employees_employee" ADD CONSTRAINT "FK_615f6cc16e65ad2d177bb099cbc" FOREIGN KEY ("employeeId") REFERENCES "boiler-plate"."employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project_employees_employee" DROP CONSTRAINT "FK_615f6cc16e65ad2d177bb099cbc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project_employees_employee" DROP CONSTRAINT "FK_8f60a620feca36927331cc2f12a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" DROP CONSTRAINT "FK_b39e4ed3bfa789758e476870ec2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" DROP CONSTRAINT "FK_ab40a6f0cd7d3ebfcce082131fd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."products" DROP CONSTRAINT "FK_99d90c2a483d79f3b627fb1d5e9"`,
    );
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_615f6cc16e65ad2d177bb099cb"`,
    );
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_8f60a620feca36927331cc2f12"`,
    );
    await queryRunner.query(
      `DROP TABLE "boiler-plate"."project_employees_employee"`,
    );
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_1851fd91666a76c48ab570b5a1"`,
    );
    await queryRunner.query(`DROP TABLE "boiler-plate"."refresh"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."project"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."employee"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."department"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."task_entity"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."users"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."user_role"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."products"`);
  }
}
