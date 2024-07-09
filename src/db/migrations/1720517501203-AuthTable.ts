import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthTable1720517501203 implements MigrationInterface {
  name = 'AuthTable1720517501203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."auth_type_enum" AS ENUM('local')`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."auth" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "type" "boiler-plate"."auth_type_enum" NOT NULL, "identifier" character varying NOT NULL, "metadata" jsonb NOT NULL, CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" DROP COLUMN "email"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" DROP COLUMN "oAuths"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-23T09:31:42.557Z"'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "boiler-plate"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-19 09:16:09.496'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "lastName" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ADD "oAuths" jsonb NOT NULL DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ADD "password" character varying NOT NULL DEFAULT '$2b$10$szOa353l2csE0R0joSck5.BhXt85ENh9s./TIEUX/BgBqKgxUQNvS'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(`DROP TABLE "boiler-plate"."auth"`);
    await queryRunner.query(`DROP TYPE "boiler-plate"."auth_type_enum"`);
  }
}
