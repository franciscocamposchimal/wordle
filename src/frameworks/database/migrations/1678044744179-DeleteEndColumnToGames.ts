import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteEndColumnToGames1678044744179 implements MigrationInterface {
    name = 'DeleteEndColumnToGames1678044744179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97"`);
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_02be80c292626635e1a372aaf04"`);
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "totalTimePlayed"`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_02be80c292626635e1a372aaf04" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_02be80c292626635e1a372aaf04"`);
        await queryRunner.query(`ALTER TABLE "words_players" DROP CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97"`);
        await queryRunner.query(`ALTER TABLE "games" ADD "totalTimePlayed" TIME WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_02be80c292626635e1a372aaf04" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "words_players" ADD CONSTRAINT "FK_adca13c10e4b0b62d0b6af88d97" FOREIGN KEY ("wordsId") REFERENCES "words"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
