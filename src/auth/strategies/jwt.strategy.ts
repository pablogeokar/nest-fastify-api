import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { FastifyRequest } from 'fastify';

interface JwtPayload {
  sub: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest): string | null => {
          return request?.cookies?.token || null; // Pegando o token do cookie
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: 'sua_chave_secreta',
    });
  }

  validate(payload: JwtPayload) {
    if (!payload?.sub || !payload?.username) {
      throw new UnauthorizedException('Token inválido');
    }
    return { userId: payload.sub, username: payload.username };
  }
}
