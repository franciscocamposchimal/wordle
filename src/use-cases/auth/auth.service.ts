import * as bcrypt from 'bcrypt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../../core/entities';
import { LoginDto, PayloadDto, UserConnectedDto, UserLoggedDto } from '../../core/dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser({ email, password }: LoginDto): Promise<User> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException();

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  login({ email, id }: UserConnectedDto): UserLoggedDto {
    const payload: PayloadDto = { user: email, sub: id };
    return {
      user: { id, email },
      access_token: this.jwtService.sign(payload),
    };
  }
}
