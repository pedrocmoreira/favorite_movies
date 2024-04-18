import { makeUpdateMovieUseCase } from "@/domain/movies/factories/make-update-movie-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateMovie(request: FastifyRequest, reply: FastifyReply) {
  const updateBodySchema = z.object({
    movie_id: z.number(),
    data: z.object({ // Atualize o schema para corresponder aos dados reais que você está passando
      watched: z.boolean().optional(),
      favorite: z.boolean().optional(),
      want_watch: z.boolean().optional(),
    }),
  });

  const { movie_id, data } = updateBodySchema.parse(request.body);

  try {
    const updateMovieUseCase = makeUpdateMovieUseCase();

    await updateMovieUseCase.execute({
      user_id: Number(request.user.sign.sub),
      movie_id,
      data, // Passe os dados para o método execute
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
