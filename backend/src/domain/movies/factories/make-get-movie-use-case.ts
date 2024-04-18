import { PrismaMoviesRepository } from "../repositories/prisma-movies-repository"
import { GetMovieUseCase } from "../use-cases/get-movie-use-case"

export function makeGetMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const getMovieUseCase = new GetMovieUseCase(moviesRepository)

  return getMovieUseCase
}
