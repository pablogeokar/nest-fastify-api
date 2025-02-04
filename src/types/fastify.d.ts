import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    user?: any;
  }
}

export { FastifyInstance, FastifyRequest, FastifyReply };
