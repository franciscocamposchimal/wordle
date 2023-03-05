import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { Request as Req } from 'express';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../../use-cases/user/user.service';
import { User, Word } from '../../core/entities';

@ApiTags('Players')
@Controller({
  path: 'players',
  version: '1',
})
export class PlayersController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    status: 200,
    description: 'Return statistics of player',
  })
  async getProfile(@Request() req: Req) {
    const { id }: any = req.user;
    return await this.userService.getProfile(id);
  }

  @Get('top')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    status: 200,
    description: 'Return statistics of player',
  })
  async getTopTenPlayers(): Promise<User[]> {
    return await this.userService.getTop();
  }

  @Get('top-words')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    status: 200,
    description: 'Return statistics of player',
  })
  async getTopTenWords(): Promise<Word[]> {
    return await this.userService.getTopWords();
  }
}
