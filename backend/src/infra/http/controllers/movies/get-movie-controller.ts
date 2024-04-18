import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetMovieUseCase } from "@/domain/movies/factories/make-get-movie-use-case";
import { z } from "zod";

export async function getMovie(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    movie_id: z.string()
  });

  const { movie_id } = getParamsSchema.parse(request.query);

  try {
    const getMovieUseCase = makeGetMovieUseCase();

    const movie = await getMovieUseCase.execute({
      user_id: Number(request.user.sign.sub),
      movie_id: Number(movie_id)
    });

    if (!movie) {
      return reply.status(404).send({ message: "Movie not found" });
    }

    return reply.status(200).send(movie);
  } catch (error) {
    reply.status(500).send({ message: "Internal server error" });
  }
}
