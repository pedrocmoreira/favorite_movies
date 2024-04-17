import { PrismaMoviesRepository } from "../repositories/prisma-movies-repository"
import { RegisterMovieUseCase } from "../use-cases/register-movie-use-case"


export function makeRegisterMovieUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const registerMovieUseCase = new RegisterMovieUseCase(moviesRepository)

  return registerMovieUseCase
}
