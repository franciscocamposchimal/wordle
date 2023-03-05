import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../use-cases/auth/auth.service';
import { User } from '../../core/entities';
import { LoginDto } from '../../core/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(req: any, email: string, password: string): Promise<User> {
    const payload: LoginDto = { email, password };
    return await this.authService.validateUser(payload);
  }
}
