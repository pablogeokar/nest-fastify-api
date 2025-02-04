import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  // Configuração de Cookies no Fastify
  void app.register(fastifyCookie, {
    secret: config().COOKIE_SECRET, // Para assinar cookies (opcional)
  });

  await app.listen(3000, '0.0.0.0');
}
void bootstrap();
