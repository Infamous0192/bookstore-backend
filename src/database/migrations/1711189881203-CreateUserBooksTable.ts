import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserBooksTable1711189881203 implements MigrationInterface {
  name = 'CreateUserBooksTable1711189881203';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_books" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_961956f2dfd99f08f8053cf4950" PRIMARY KEY ("usersId", "booksId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8384931aac8ac91dda9d1f83c" ON "user_books" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_feb9d8083aefec5c5cc9208263" ON "user_books" ("booksId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_books" ADD CONSTRAINT "FK_e8384931aac8ac91dda9d1f83c8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_books" ADD CONSTRAINT "FK_feb9d8083aefec5c5cc9208263c" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_books" DROP CONSTRAINT "FK_feb9d8083aefec5c5cc9208263c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_books" DROP CONSTRAINT "FK_e8384931aac8ac91dda9d1f83c8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_feb9d8083aefec5c5cc9208263"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8384931aac8ac91dda9d1f83c"`,
    );
    await queryRunner.query(`DROP TABLE "user_books"`);
  }
}
