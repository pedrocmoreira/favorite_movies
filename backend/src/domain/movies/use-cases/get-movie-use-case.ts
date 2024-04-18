import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";
import { MovieNotExists } from "../errors/movie-not-exists-error";

interface GetMovieUseCaseRequest {
  user_id: number;
  movie_id: number;
}

interface GetMovieUseCaseResponse {
  movie: Movie;
}

export class GetMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({
    user_id,
    movie_id
  }: GetMovieUseCaseRequest): Promise<GetMovieUseCaseResponse> {
    const movie = await this.moviesRepository.findByUserAndMovieId(movie_id, user_id);

    if (!movie) {
      throw new MovieNotExists();
    }
    
    return { movie };
  }
}