import { Movie, Prisma } from "@prisma/client";
import { MoviesRepository } from "./movies-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMoviesRepository implements MoviesRepository {
  async create(data: Prisma.MovieCreateInput){
    const movie = await prisma.movie.create({
      data,
    });

    return movie;
  }

  async findById(id: number): Promise<Movie | null>{
    const movie = await prisma.movie.findFirst({
      where: {
        id,
      }
    });

    return movie;
  }
}