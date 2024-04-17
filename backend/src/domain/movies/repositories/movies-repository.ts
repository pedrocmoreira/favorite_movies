import { Movie, Prisma, User } from '@prisma/client';

export interface MoviesRepository {
  create(data: Prisma.MovieUncheckedCreateInput): Promise<Movie>
  findById(id: number): Promise<Movie | null>
}