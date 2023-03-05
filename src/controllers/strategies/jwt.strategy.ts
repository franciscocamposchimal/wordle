import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadDto, UserConnectedDto } from '../../core/dto/login.dto';

export class JwtStrategy extends PassportStrategy(Strategy, 'main') {
  constructor() {
    const secret = process.env.ACCESS_JWT_SECRET_KEY;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payload: PayloadDto): Promise<UserConnectedDto> {
    return { id: payload.sub, email: payload.user };
  }
}
