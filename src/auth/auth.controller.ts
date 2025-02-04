import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

// biome-ignore lint/suspicious/noDecorators: NestJS requires decorators
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // biome-ignore lint/suspicious/noDecorators: NestJS requires decorators
  @Post('login')
  login(@Req() request: FastifyRequest, @Res() reply: FastifyReply) {
    const { id, username } = request.body as { id: string; username: string };
    return this.authService.login({ id: id.toString(), username }, reply);
  }

  // biome-ignore lint/suspicious/noDecorators: NestJS requires decorators
  @Post('logout')
  logout(@Res() reply: FastifyReply) {
    return this.authService.logout(reply);
  }

  // biome-ignore lint/suspicious/noDecorators: NestJS requires decorators
  @Post('protected')
  // biome-ignore lint/suspicious/noDecorators: NestJS requires decorators
  @UseGuards(JwtAuthGuard)
  protectedRoute() {
    return { message: 'Você está autenticado!' };
  }
}
