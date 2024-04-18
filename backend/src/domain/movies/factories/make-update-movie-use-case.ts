import { PrismaMoviesRepository } from "../repositories/prisma-movies-repository"
import { UpdateMovieUseCase } from "../use-cases/update-movie-use-case"


export function makeUpdateMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const updateMovieUseCase = new UpdateMovieUseCase(moviesRepository)

  return updateMovieUseCase
}
