import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangedRoleToName1719144130099 implements MigrationInterface {
  name = 'ChangedRoleToName1719144130099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "role" TO "name"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_role_enum" RENAME TO "user_role_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."task_entity" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$BUQLo8RMZEYn9P3W.nGeUOKD6IiJ13bdjrYTd4EPBsms5YVI18ZGG'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-07T12:02:11.665Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-06 23:13:23.571'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$Tblma3MZjwNr4xhurxPv6OJwCQPpyv8nrdJ.3.FFnp7Z8aKIne1Jq'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."task_entity" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_name_enum" RENAME TO "user_role_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "name" TO "role"`,
    );
  }
}
