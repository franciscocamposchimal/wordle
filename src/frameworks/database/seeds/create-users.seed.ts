import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder } from '@jorgebodega/typeorm-seeding';
import { User } from '../../../core/entities';
import { UserFactory } from '../factories/user.factory';

export default class CreateUsersSeed extends Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await dataSource.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    await dataSource.query('TRUNCATE users CASCADE');

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash('Password123', salt);
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email: 'wordlw@gmail.com',
        password,
      })
      .execute();

    new UserFactory().createMany(10, { password }, { listeners: false });
  }
}
