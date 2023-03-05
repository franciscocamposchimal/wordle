import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-factory';
import { faker } from '@faker-js/faker';
import dataSource from '../../database/typeorm/typeorm.config';
import { User } from '../../../core/entities';

export class UserFactory extends Factory<User> {
  protected entity = User;
  protected dataSource = dataSource;

  protected attrs(): FactorizedAttrs<User> {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
