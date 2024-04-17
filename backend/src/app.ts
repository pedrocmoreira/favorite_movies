import fastify from 'fastify';

import { ZodError } from 'zod';
import { env } from './env';

import fastifyJwt from '@fastify/jwt';
import cors from '@fastify/cors'
import { moviesRoutes } from './infra/http/controllers/movies/routes';
import { usersRoutes } from './infra/http/controllers/users/routes';

export const app = fastify();

 app.register(cors,  {
  origin: "*",
  methods: ["POST"]
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  }
});

app.register(usersRoutes);
app.register(moviesRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({message: 'Validation error', issues: error.format()});
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error);
  }else {
    // TODO: aqui deveria ser feito um log com uma ferramenta externa por exemplo DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error' });
});