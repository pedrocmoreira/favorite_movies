import { Movie, Prisma } from "@prisma/client";
import { MoviesRepository, UpdateProps } from "./movies-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMoviesRepository implements MoviesRepository {
  async create(data: Prisma.MovieCreateInput) {
    const movie = await prisma.movie.create({
      data,
    });

    return movie;
  }

  async updateByUserAndMovieId({ user_id, movie_id, updates }: UpdateProps): Promise<Movie | null> {
    const movie = await prisma.movie.findFirst({
      where: {
        user_id: user_id,
        movie_id: movie_id
      }
    });

    if (!movie) {
      console.error('Movie not found or does not belong to the user');
      return null;
    }

    const updatedMovie = await prisma.movie.update({
      where: {
        id: movie.id
      },
      data: updates,
    });

    return updatedMovie;
  }

  async findById(movie_id: number): Promise<Movie | null> {
    const movie = await prisma.movie.findFirst({
      where: {
        movie_id,
      }
    });

    return movie;
  }

  async findByMovieId(movie_id: number): Promise<Movie | null> {
    const movie = await prisma.movie.findFirst({
      where: {
        movie_id: movie_id
      },
    });

    return movie;
  }

  async findByUserAndMovieId(movie_id: number, user_id: number): Promise<Movie | null> {
    const movie = await prisma.movie.findFirst({
      where: {
        movie_id: movie_id,
        user_id: user_id
      }
    });

    return movie;
  }

  async listByUserId(user_id: number): Promise<Movie[]> {
    const movies = await prisma.movie.findMany({
      where: {
        user_id: user_id,
      },
    });
    return movies;
  }

}