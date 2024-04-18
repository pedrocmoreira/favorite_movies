import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";

interface ListMoviesUseCaseRequest {
  user_id: number;
}

interface ListMoviesUseCaseResponse {
  movies: Movie[];
}

export class ListMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({
    user_id,
  }: ListMoviesUseCaseRequest): Promise<ListMoviesUseCaseResponse> {
    const movies = await this.moviesRepository.listByUserId(user_id);

    return { movies };
  }
}
