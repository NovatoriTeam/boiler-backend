import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatedThreeReleatedCrud1719319217128
  implements MigrationInterface
{
  name = 'CreatedThreeReleatedCrud1719319217128';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "role" TO "name"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_role_enum" RENAME TO "user_role_name_enum"`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."department" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "manager" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."employee" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "hireDate" TIMESTAMP NOT NULL, "jobTitle" character varying NOT NULL, "salary" numeric(10,2) NOT NULL, "departmentId" integer NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."project" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" text NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "budget" numeric(10,2) NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`,
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
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$VVZSZaDSwykofqQ1xfzN0OML2Rjl06aK1LuqwE4tLGtdiXWKgBi7G'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-09T12:40:18.808Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."employee" ADD CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454" FOREIGN KEY ("departmentId") REFERENCES "boiler-plate"."department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "boiler-plate"."employee" DROP CONSTRAINT "FK_9ad20e4029f9458b6eed0b0c454"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-08 15:12:35.743'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$h85mQuaua2r9LQuSbtZqy.zX9K6qBZwvqIGjD4n2kFY5syk5/CMhK'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" DROP NOT NULL`,
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
    await queryRunner.query(`DROP TABLE "boiler-plate"."project"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."employee"`);
    await queryRunner.query(`DROP TABLE "boiler-plate"."department"`);
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_name_enum" RENAME TO "user_role_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "name" TO "role"`,
    );
  }
}
