import { readFileSync } from 'fs';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Word } from '../../../core/entities';

export default class ImportWordsSeed extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('ALTER SEQUENCE words_id_seq RESTART WITH 1');
    await dataSource.query('TRUNCATE words CASCADE');

    const words = readFileSync(__dirname + '/words.txt', 'utf8');
    const wordsList = words
      .split('\n')
      .filter(w => w.trim().length === 5)
      .map(w => ({ text: w }));

    await dataSource.createQueryBuilder().insert().into(Word).values(wordsList).execute();
  }
}
