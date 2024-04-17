import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate-user-controller';
import { register } from './register-user-controller';


export async function usersRoutes(app: FastifyInstance) {
  app.post('/users/authenticate', authenticate);

  app.post('/users/register', register);
}
