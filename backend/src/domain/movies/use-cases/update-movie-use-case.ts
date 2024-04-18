import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";
import { MovieNotExists } from "../errors/movie-not-exists-error";

interface UpdateMovieUseCaseResponse {
  movie: Movie | null
}

interface UpdateMovieUseCaseRequest {
  data: Partial<Movie>; 
  user_id: number;
  movie_id: number;
}

export class UpdateMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) {}

  async execute({ data, user_id, movie_id }: UpdateMovieUseCaseRequest): Promise<UpdateMovieUseCaseResponse> {
    const movie = await this.moviesRepository.updateByUserAndMovieId({
      movie_id,
      user_id,
      updates: data, 
    });

    return { movie };
  }
}