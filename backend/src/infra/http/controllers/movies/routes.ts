import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerMovie } from "./register-movie-controller";

export async function moviesRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT);

  app.post('/movies/register', registerMovie);
}