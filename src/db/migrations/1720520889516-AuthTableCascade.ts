import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthTableCascade1720520889516 implements MigrationInterface {
  name = 'AuthTableCascade1720520889516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-23T10:28:13.265Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-23 09:34:55.263'`,
    );
  }
}
