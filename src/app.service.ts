import { Injectable } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Injectable()
export class AppService {
  getHello(reply: FastifyReply) {
    const token = reply.request.cookies['token'] || '';
    return reply.send({ message: 'Hello World!', cookie: token });
  }
}
