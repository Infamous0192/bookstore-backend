import { MigrationInterface, QueryRunner } from 'typeorm';

export class Version11711060564449 implements MigrationInterface {
  name = 'Version11711060564449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "path" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "books" ("id" SERIAL NOT NULL, "title" character varying, "content" character varying, "author" character varying, "price" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "thumbnailId" integer, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "book_tags" ("booksId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_859e6cb40504f0ea9edf795ff77" PRIMARY KEY ("booksId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_629a993448fe8b8605877a8158" ON "book_tags" ("booksId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a5763bb3f3f6792d7356f69d66" ON "book_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "books" ADD CONSTRAINT "FK_0ba77bdd35819a2beed171017e2" FOREIGN KEY ("thumbnailId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_tags" ADD CONSTRAINT "FK_629a993448fe8b8605877a81589" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_tags" ADD CONSTRAINT "FK_a5763bb3f3f6792d7356f69d661" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book_tags" DROP CONSTRAINT "FK_a5763bb3f3f6792d7356f69d661"`,
    );
    await queryRunner.query(
      `ALTER TABLE "book_tags" DROP CONSTRAINT "FK_629a993448fe8b8605877a81589"`,
    );
    await queryRunner.query(
      `ALTER TABLE "books" DROP CONSTRAINT "FK_0ba77bdd35819a2beed171017e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a5763bb3f3f6792d7356f69d66"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_629a993448fe8b8605877a8158"`,
    );
    await queryRunner.query(`DROP TABLE "book_tags"`);
    await queryRunner.query(`DROP TABLE "books"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
