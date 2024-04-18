import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";

interface ListMoviesUseCaseRequest {
  user_id: number;
  watched?: boolean;
  favorite?: boolean;
  want_watch?: boolean;
  movie_id?: number;
}


interface ListMoviesUseCaseResponse {
  movies?: Movie[];
  movie?: Movie | null;
}

export class ListMoviesUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({
    user_id,
    watched,
    favorite,
    want_watch,
    movie_id
  }: ListMoviesUseCaseRequest): Promise<ListMoviesUseCaseResponse> {
    const filters = { watched, favorite, want_watch };

    if (movie_id) {
      const movie = await this.moviesRepository.findByUserAndMovieId(movie_id, user_id);

      return { movie }
    }

    const movies = await this.moviesRepository.listByUserId(user_id, filters);

    return { movies };
  }
}

