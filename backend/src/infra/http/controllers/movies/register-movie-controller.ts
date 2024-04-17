import { makeRegisterMovieUseCase } from "@/domain/movies/factories/make-register-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function registerMovie(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    movie_id: z.number(),
    title: z.string(),
    release_date: z.string(),
    poster_path: z.string(),
  });

  const { movie_id, title, release_date, poster_path } = registerBodySchema.parse(request.body);

  try {
    const registerMovieUseCase = makeRegisterMovieUseCase();

    await registerMovieUseCase.execute({
      user_id: Number(request.user.sign.sub),
      movie_id,
      title,
      release_date,
      poster_path
    })
  } catch (error) {
    throw error
  }

  return reply.status(201).send();
}