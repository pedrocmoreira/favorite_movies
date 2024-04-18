import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerMovie } from "./register-movie-controller";
import { updateMovie } from "./update-movie-controller";
import { listMovies } from "./list-movies-controller";

export async function moviesRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT);

  app.post('/movies/register', registerMovie);

  app.put('/movies/update', updateMovie);

  app.get('/movies/list', listMovies);
}