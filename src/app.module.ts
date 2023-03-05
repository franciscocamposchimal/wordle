import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './frameworks/database/typeorm/typeorm.config';
import { AuthModule } from './use-cases/auth/auth.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UserModule } from './use-cases/user/user.module';
import { GameModule } from './use-cases/game/game.module';
import { GameController } from './controllers/game/game.controller';
import { PlayersController } from './controllers/players/players.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    UserModule,
    GameModule,
  ],
  controllers: [AuthController, GameController, PlayersController],
  providers: [],
})
export class AppModule {}
