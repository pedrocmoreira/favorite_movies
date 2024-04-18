import { PrismaMoviesRepository } from "../repositories/prisma-movies-repository"
import { ListMoviesUseCase } from "../use-cases/list-movie-use-case"
import { UpdateMovieUseCase } from "../use-cases/update-movie-use-case"


export function makeListMoviesUseCase() {
  const moviesRepository = new PrismaMoviesRepository()
  const listMovieUseCase = new ListMoviesUseCase(moviesRepository)

  return listMovieUseCase
}
