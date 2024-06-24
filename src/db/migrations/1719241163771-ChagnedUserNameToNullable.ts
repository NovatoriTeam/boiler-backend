import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChagnedUserNameToNullable1719241163771
  implements MigrationInterface
{
  name = 'ChagnedUserNameToNullable1719241163771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "name" TO "role"`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_name_enum" RENAME TO "user_role_role_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$H6y8BUoiqRvFSQR6SxJQ3u/JtjlJ7MUyQXSpWBO8dhRqx.RpspMr6'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '"2024-07-08T14:59:25.375Z"'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."refresh" ALTER COLUMN "expirationDate" SET DEFAULT '2024-07-07 12:02:11.665'`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."users" ALTER COLUMN "password" SET DEFAULT '$2b$10$BUQLo8RMZEYn9P3W.nGeUOKD6IiJ13bdjrYTd4EPBsms5YVI18ZGG'`,
    );
    await queryRunner.query(
      `ALTER TYPE "boiler-plate"."user_role_role_enum" RENAME TO "user_role_name_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boiler-plate"."user_role" RENAME COLUMN "role" TO "name"`,
    );
  }
}
