import { MigrationInterface, QueryRunner } from 'typeorm';

export class MadeLastnameNullable1720628888939 implements MigrationInterface {
  name = 'MadeLastnameNullable1720628888939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-24T16:28:10.531Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-24 16:26:22.066'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" SET NOT NULL`,
    );
  }
}
