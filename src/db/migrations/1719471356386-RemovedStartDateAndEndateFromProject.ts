import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedStartDateAndEndateFromProject1719471356386
  implements MigrationInterface
{
  name = 'RemovedStartDateAndEndateFromProject1719471356386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project" DROP COLUMN "startDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project" DROP COLUMN "endDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$KNh3hGy9riPt4wkY/l9iS.fScoiM3n9ASFc402pNkFwQAHH9vr00e'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-11T06:55:57.968Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-09 12:40:18.808'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$VVZSZaDSwykofqQ1xfzN0OML2Rjl06aK1LuqwE4tLGtdiXWKgBi7G'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project" ADD "endDate" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."project" ADD "startDate" TIMESTAMP NOT NULL`,
    );
  }
}
