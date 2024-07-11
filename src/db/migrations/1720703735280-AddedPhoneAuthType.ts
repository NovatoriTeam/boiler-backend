import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedPhoneAuthType1720703735280 implements MigrationInterface {
  name = 'AddedPhoneAuthType1720703735280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."sender_logs_status_enum" AS ENUM('pending', 'delivered', 'undelivered', 'unkown', 'notSent')`,
    );
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."sender_logs_sender_enum" AS ENUM('twilio', 'senderGe')`,
    );
    await queryRunner.query(
      `CREATE TABLE "boiler-plate"."sender_logs" ("id" SERIAL NOT NULL, "content" character varying, "phone" character varying NOT NULL, "status" "boiler-plate"."sender_logs_status_enum", "sender" "boiler-plate"."sender_logs_sender_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_354703c3c38ea26dc2e9472d209" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `DROP INDEX "boiler-plate"."IDX_2ef175b1449e34d7fd97406fd5"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."auth_type_enum" RENAME TO "auth_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."auth_type_enum" AS ENUM('local', 'google', 'discord', 'facebook', 'github', 'bnet', 'steam', 'phone')`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."auth" ALTER COLUMN "type" TYPE "boiler-plate"."auth_type_enum" USING "type"::"text"::"boiler-plate"."auth_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "boiler-plate"."auth_type_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-25T13:15:36.697Z"'`,
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
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-25 11:46:04.246'`,
    );
    await queryRunner.query(
      `CREATE TYPE "boiler-plate"."auth_type_enum_old" AS ENUM('local', 'google', 'discord', 'facebook', 'github', 'bnet', 'steam')`,
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
    await queryRunner.query(`DROP TABLE "boiler-plate"."sender_logs"`);
    await queryRunner.query(
      `DROP TYPE "boiler-plate"."sender_logs_sender_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "boiler-plate"."sender_logs_status_enum"`,
    );
  }
}
