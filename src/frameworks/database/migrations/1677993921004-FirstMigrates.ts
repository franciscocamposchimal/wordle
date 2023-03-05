import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigrates1677993921004 implements MigrationInterface {
  name = 'FirstMigrates1677993921004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "words" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "text" character varying(120) NOT NULL, "hitsCount" integer NOT NULL DEFAULT '0', "missCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_feaf97accb69a7f355fa6f58a3d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "email" character varying(120) NOT NULL, "password" character varying(120) NOT NULL, "hitsWordsCount" integer NOT NULL DEFAULT '0', "missWordsCount" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "games" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "word" character varying(5) NOT NULL, "attempts" jsonb DEFAULT '[]', "attemptCount" integer NOT NULL DEFAULT '0', "isOpen" boolean NOT NULL DEFAULT false, "isWon" boolean NOT NULL DEFAULT false, "dueTime" TIMESTAMP WITH TIME ZONE, "endTime" TIMESTAMP WITH TIME ZONE, "totalTimePlayed" TIME WITH TIME ZONE, "playerId" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "words_players" ("wordsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_b9a713ba94d979a409ba6b5ca10" PRIMARY KEY ("wordsId", "usersId"))`,
    );
    await queryRunner.query(`CREATE INDEX "IDX_adca13c10e4b0b62d0b6af88d9" ON "words_players" ("wordsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_02be80c292626635e1a372aaf0" ON "words_players" ("usersId") `);
    await queryRunner.query(
      `ALTER TABLE "games" ADD CONSTRAINT "FK_0f512be89f6dc60d9a843fad71e" FOREIGN KEY ("playerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_players" ADD CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "words_players" ADD CONSTRAINT "FK_02be80c292626635e1a372aaf04" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_02be80c292626635e1a372aaf04"`);
    await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97"`);
    await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_0f512be89f6dc60d9a843fad71e"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_02be80c292626635e1a372aaf0"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_adca13c10e4b0b62d0b6af88d9"`);
    await queryRunner.query(`DROP TABLE "words_players"`);
    await queryRunner.query(`DROP TABLE "games"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "words"`);
  }
}
