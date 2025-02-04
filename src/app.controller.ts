import { Controller, Get, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() reply: FastifyReply) {
    return this.appService.getHello(reply);
  }
}
