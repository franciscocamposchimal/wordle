import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserColumn1678009319908 implements MigrationInterface {
    name = 'ChangeUserColumn1678009319908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97"`);
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_02be80c292626635e1a372aaf04"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hitsWordsCount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "missWordsCount"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "totalWordsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hitWordsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_02be80c292626635e1a372aaf04" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_02be80c292626635e1a372aaf04"`);
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hitWordsCount"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "totalWordsCount"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "missWordsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hitsWordsCount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_02be80c292626635e1a372aaf04" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
