import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { AuthService } from '../../use-cases/auth/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginDto, UserConnectedDto, UserLoggedDto } from '../../core/dto/login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authservice: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    status: 201,
    description: 'Login user and get JWT',
    type: LoginDto,
  })
  async login(@Request() req: Req): Promise<UserLoggedDto> {
    const { id, email }: any = req.user;
    const userLogged: UserConnectedDto = { id, email };
    return this.authservice.login(userLogged);
  }
}
