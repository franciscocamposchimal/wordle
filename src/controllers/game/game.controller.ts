import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { GameService } from '../../use-cases/game/game.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GameDto, UserAttemptDto } from '../../core/dto/game.dto';

@ApiTags('Game')
@Controller({
  path: 'game',
  version: '1',
})
export class GameController {
  constructor(private gameService: GameService) {}

  @Get('init')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    status: 200,
    description: 'Return a current game or a new game',
  })
  async getGame(@Request() req: Req): Promise<GameDto> {
    const { id }: any = req.user;
    return await this.gameService.getGame(id);
  }

  @Post('attempt')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    status: 201,
    description: 'Try guess a word',
  })
  async attemptToGuess(@Request() req: Req, @Body() body: UserAttemptDto): Promise<GameDto> {
    const { id }: any = req.user;
    const { userWord } = body;
    return await this.gameService.tryToGess(id, userWord);
  }
}
