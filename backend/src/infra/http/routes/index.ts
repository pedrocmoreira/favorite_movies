import { FastifyInstance } from 'fastify'
import { authenticate } from '../controllers/users/authenticate-user-controller'
import { register } from '../controllers/users/register-user-controller'


export async function appRoutes(app: FastifyInstance) {
  app.post('/authenticate-user', authenticate)

  app.post('/register-user', register)
}
