import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from './game.service';
import { Game, User, Word } from '../../core/entities';
import { JwtStrategy } from '../../controllers/strategies/jwt.strategy';
import { GameController } from '../../controllers/game/game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Game, User, Word])],
  providers: [GameService, JwtStrategy],
  controllers: [GameController],
  exports: [GameService],
})
export class GameModule {}
