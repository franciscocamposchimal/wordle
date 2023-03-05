import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../../controllers/strategies/jwt.strategy';
import { User, Word } from '../../core/entities';
import { UserService } from './user.service';
import { PlayersController } from '../../controllers/players/players.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Word])],
  providers: [UserService, JwtStrategy],
  controllers: [PlayersController],
  exports: [UserService],
})
export class UserModule {}
