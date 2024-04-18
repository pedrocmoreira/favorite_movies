import { Movie } from "@prisma/client";
import { MoviesRepository } from "../repositories/movies-repository";
import axios from "axios";
import { env } from "@/env";


interface UpdateMovieUseCaseResponse {
  movie: Movie | null
}

interface UpdateMovieUseCaseRequest {
  data: Partial<Movie>;
  user_id: number;
  movie_id: number;
}

export class UpdateMovieUseCase {
  constructor(private moviesRepository: MoviesRepository) { }

  async execute({ data, user_id, movie_id }: UpdateMovieUseCaseRequest): Promise<UpdateMovieUseCaseResponse> {
    const findMovie = await this.moviesRepository.findByUserAndMovieId(movie_id, user_id);

    if (!findMovie) {
      const response = await axios(`https://api.themoviedb.org/3/movie/${movie_id}?language=pt-BR`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${env.MOVIE_DB_TOKEN}`
        }
      });
      
      await this.moviesRepository.create({
        movie_id,
        release_date: response.data.release_date,
        poster_path: response.data.poster_path,
        title: response.data.title,
        user_id
      });

      const movie = await this.moviesRepository.updateByUserAndMovieId({
        movie_id,
        user_id,
        updates: data,
      });

      return { movie }
    }

    const movie = await this.moviesRepository.updateByUserAndMovieId({
      movie_id,
      user_id,
      updates: data,
    });

    return { movie };
  }
}