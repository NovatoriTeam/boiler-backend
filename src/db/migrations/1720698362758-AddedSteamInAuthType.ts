import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedSteamInAuthType1720698362758 implements MigrationInterface {
  name = 'AddedSteamInAuthType1720698362758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_2ef175b1449e34d7fd97406fd5"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."auth_type_enum" RENAME TO "auth_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."auth_type_enum" AS ENUM('local', 'google', 'discord', 'facebook', 'github', 'bnet', 'steam')`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ALTER COLUMN "type" TYPE "boiler-plate"."auth_type_enum" USING "type"::"text"::"boiler-plate"."auth_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "boiler-plate"."auth_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-25T11:46:04.246Z"'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2ef175b1449e34d7fd97406fd5" ON "boiler-plate"."auth" ("type", "identifier") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_2ef175b1449e34d7fd97406fd5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-25 10:48:08.117'`,
    );
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."auth_type_enum_old" AS ENUM('local', 'google', 'discord', 'facebook', 'github', 'bnet')`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ALTER COLUMN "type" TYPE "boiler-plate"."auth_type_enum_old" USING "type"::"text"::"boiler-plate"."auth_type_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "boiler-plate"."auth_type_enum"`);
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."auth_type_enum_old" RENAME TO "auth_type_enum"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_2ef175b1449e34d7fd97406fd5" ON "boiler-plate"."auth" ("type", "identifier") `,
    );
  }
}
