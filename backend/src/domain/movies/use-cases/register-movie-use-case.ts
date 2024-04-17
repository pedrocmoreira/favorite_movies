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
  movie: Movie
}

export class RegisterMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({ user_id, movie_id, title, release_date, poster_path }: RegisterMovieUseCaseRequest): Promise<RegisterMovieUseCaseResponse> {

    const movieWithSameId = await this.moviesRepository.findById(movie_id);

    if (movieWithSameId) {
      return { movie: movieWithSameId }
    }

    const movie = await this.moviesRepository.create({
      id: movie_id,
      user_id, 
      title,
      release_date, 
      poster_path
    });

    return {
      movie
    }
  }
}