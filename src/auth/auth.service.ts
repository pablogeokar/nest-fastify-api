import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { FastifyReply } from 'fastify';

interface UserPayload {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(user: UserPayload, reply: FastifyReply) {
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    reply.setCookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600000, // 1 hora
    });

    return reply.send({ message: 'Login realizado com sucesso!' });
  }

  logout(reply: FastifyReply) {
    reply.clearCookie('token', { path: '/' });
    return reply.send({ message: 'Logout realizado com sucesso!' });
  }
}
