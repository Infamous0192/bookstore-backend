/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES  */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS "books" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''books_id_seq''::regclass)',
	"title" VARCHAR NULL DEFAULT NULL,
	"content" VARCHAR NULL DEFAULT NULL,
	"author" VARCHAR NULL DEFAULT NULL,
	"price" INTEGER NULL DEFAULT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"thumbnailId" INTEGER NULL DEFAULT NULL,
	PRIMARY KEY ("id"),
	CONSTRAINT "FK_0ba77bdd35819a2beed171017e2" FOREIGN KEY ("thumbnailId") REFERENCES "files" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS "book_tags" (
	"booksId" INTEGER NOT NULL,
	"tagsId" INTEGER NOT NULL,
	PRIMARY KEY ("booksId", "tagsId"),
	INDEX "IDX_629a993448fe8b8605877a8158" ("booksId"),
	INDEX "IDX_a5763bb3f3f6792d7356f69d66" ("tagsId"),
	CONSTRAINT "FK_629a993448fe8b8605877a81589" FOREIGN KEY ("booksId") REFERENCES "books" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "FK_a5763bb3f3f6792d7356f69d661" FOREIGN KEY ("tagsId") REFERENCES "tags" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "files" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''files_id_seq''::regclass)',
	"filename" VARCHAR NULL DEFAULT NULL,
	"originalname" VARCHAR NULL DEFAULT NULL,
	"extension" VARCHAR NULL DEFAULT NULL,
	"size" INTEGER NULL DEFAULT NULL,
	"path" VARCHAR NULL DEFAULT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "migrations" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''migrations_id_seq''::regclass)',
	"timestamp" BIGINT NOT NULL,
	"name" VARCHAR NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "tags" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''tags_id_seq''::regclass)',
	"name" VARCHAR NULL DEFAULT NULL,
	"description" VARCHAR NULL DEFAULT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" INTEGER NOT NULL DEFAULT 'nextval(''users_id_seq''::regclass)',
	"name" VARCHAR NULL DEFAULT NULL,
	"username" VARCHAR NULL DEFAULT NULL,
	"password" VARCHAR NULL DEFAULT NULL,
	"role" VARCHAR NULL DEFAULT NULL,
	"point" INTEGER NULL DEFAULT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	"updatedAt" TIMESTAMP NOT NULL DEFAULT 'now()',
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_books" (
	"usersId" INTEGER NOT NULL,
	"booksId" INTEGER NOT NULL,
	PRIMARY KEY ("usersId", "booksId"),
	INDEX "IDX_e8384931aac8ac91dda9d1f83c" ("usersId"),
	INDEX "IDX_feb9d8083aefec5c5cc9208263" ("booksId"),
	CONSTRAINT "FK_e8384931aac8ac91dda9d1f83c8" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT "FK_feb9d8083aefec5c5cc9208263c" FOREIGN KEY ("booksId") REFERENCES "books" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
