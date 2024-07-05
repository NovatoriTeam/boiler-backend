import { MigrationInterface, QueryRunner } from 'typeorm';

export class OAuthColumn1720170968362 implements MigrationInterface {
  name = 'OAuthColumn1720170968362';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ADD "oAuths" jsonb NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$szOa353l2csE0R0joSck5.BhXt85ENh9s./TIEUX/BgBqKgxUQNvS'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-19T09:16:09.496Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-19 09:12:24.385'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$9w4vnzyigriILyTDhRpBR.hwB0uc4Mfs.rvtZpvVFtYrK6q7HrRl.'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" DROP COLUMN "oAuths"`,
    );
  }
}
