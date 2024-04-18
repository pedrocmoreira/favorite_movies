import { makeListMoviesUseCase } from "@/domain/movies/factories/make-list-movies-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function listMovies(request: FastifyRequest, reply: FastifyReply){
  try {
    const listMoviesUseCase = makeListMoviesUseCase();

    const movies = await listMoviesUseCase.execute({
      user_id: Number(request.user.sign.sub),
    })

    return reply.status(200).send(movies)
  } catch (error) {
    throw error
  }

}