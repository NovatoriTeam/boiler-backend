import { MigrationInterface, QueryRunner } from 'typeorm';

export class OAuth1720095808356 implements MigrationInterface {
  name = 'OAuth1720095808356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$20IPs4t1I50w4FZkkNrqLeL7ZMPIhNBq202qycTkffx8tlQrDq5mm'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-18T12:23:29.540Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-18 10:37:11.602'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$xcD4nzTtPkMImPD/bHRmIu1vP/tkpxuTz4dZedqM.V8REKY23ZD6e'`,
    );
  }
}
