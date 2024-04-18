import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { registerMovie } from "./register-movie-controller";
import { updateMovie } from "./update-movie-controller";
import { listMovies } from "./list-movies-controller";
import { getMovie } from "./get-movie-controller";

export async function moviesRoutes(app: FastifyInstance){
  app.addHook('onRequest', verifyJWT);

  app.post('/movies/register', registerMovie);

  app.post('/movies/update', updateMovie);
  
  app.get('/movies/get', getMovie);

  app.get('/movies/list', listMovies);

}