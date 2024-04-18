import { Movie, Prisma, User } from '@prisma/client';

export interface UpdateProps {
  user_id: number;
  movie_id: number, 
  updates: Partial<Prisma.MovieUpdateInput>
}

export interface MoviesRepository {
  create(data: Prisma.MovieUncheckedCreateInput): Promise<Movie>
  updateByUserAndMovieId({user_id, movie_id, updates}: UpdateProps):Promise<Movie | null>
  findById(movie_id: number): Promise<Movie | null>
  findByMovieId(movie_id: number): Promise<Movie | null>
  listByUserId(user_id: number): Promise<Movie[]>;
  findByUserAndMovieId(movie_id: number, user_id: number): Promise<Movie | null>
}