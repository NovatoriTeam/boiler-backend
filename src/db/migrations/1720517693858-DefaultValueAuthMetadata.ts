import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultValueAuthMetadata1720517693858
  implements MigrationInterface
{
  name = 'DefaultValueAuthMetadata1720517693858';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ALTER COLUMN "metadata" SET DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-23T09:34:55.263Z"'`,
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
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-23 09:31:42.557'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ALTER COLUMN "metadata" DROP DEFAULT`,
    );
  }
}
