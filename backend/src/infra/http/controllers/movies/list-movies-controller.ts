import { makeListMoviesUseCase } from "@/domain/movies/factories/make-list-movies-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listMovies(request: FastifyRequest, reply: FastifyReply){
  try {
    const listBodySchema = z.object({
      watched: z.string().optional(), 
      favorite: z.string().optional(),
      want_watch: z.string().optional(),
    });

    const queryParams = listBodySchema.parse(request.query);

 
    const watched = queryParams.watched ? queryParams.watched === 'true' : undefined;
    const favorite = queryParams.favorite ? queryParams.favorite === 'true' : undefined;
    const want_watch = queryParams.want_watch ? queryParams.want_watch === 'true' : undefined;

    const listMoviesUseCase = makeListMoviesUseCase();

    const movies = await listMoviesUseCase.execute({
      user_id: Number(request.user.sign.sub),
      watched, 
      favorite,
      want_watch
    });

    return reply.status(200).send(movies);
  } catch (error) {
    console.error('Failed to list movies', error);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}