import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";

interface RegisterMovieUseCaseRequest {
  movie_id: number;
  user_id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

interface RegisterMovieUseCaseResponse {
  movie: Movie;
}

export class RegisterMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({
    user_id,
    movie_id,
    title,
    release_date,
    poster_path,
  }: RegisterMovieUseCaseRequest): Promise<RegisterMovieUseCaseResponse> {
    const existingMovie = await this.moviesRepository.findByUserAndMovieId(
      movie_id,
      user_id
    );

    if (existingMovie) {
      return { movie: existingMovie };
    } else {
      const newMovie = await this.moviesRepository.create({
        movie_id,
        user_id,
        title,
        release_date,
        poster_path,
      });

      return { movie: newMovie };
    }
  }
}
