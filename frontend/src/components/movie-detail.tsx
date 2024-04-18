import { DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Bookmark, Check, Heart, X } from "lucide-react";
import { api, apiMovieDB } from "@/lib/axios";
import { env } from "@/env";
import { useEffect, useState } from "react";
import { MovieDetailDTO } from "@/dto/movie-details-dto";
import { formatDate } from "@/utils/format-date";
import { toast } from "sonner";

export interface MovieDetail {
  movieId: number;
  open: boolean;
}

interface MovieApi {
  id: number
  movie_id: number
  title: string
  release_date: string
  poster_path: string
  watched: boolean
  favorite: boolean
  want_watch: boolean
  created_at: string
  updated_at: string
  user_id: number
}

export function MovieDetail({ movieId }: MovieDetail) {
  const [movie, setMovie] = useState<MovieDetailDTO>();
  const [movieApi, setMovieApi] = useState<MovieApi>();

  async function getMovieDetail() {
    const { data } = await apiMovieDB(`/movie/${movieId}?language=pt-BR`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setMovie(data);
  }

  async function getMovieStatus() {
    const { data } = await api(`/movies/get?movie_id=${movieId}`, {
      method: 'GET',
    });

    setMovieApi(data.movie);
  }

  async function handleFavoriteMovie(movie_id: number){
    try {   
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id":movie_id,
          "data": {
            "favorite": !movieApi?.favorite
          }
        }
      });

      getMovieStatus()
  
      toast.success(!movieApi?.favorite ? 'Filme adicionado aos favoritos' : 'Fime removido dos favoritos');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  async function handleWatchedMovie(movie_id: number){
    try {   
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id":movie_id,
          "data": {
            "watched": !movieApi?.watched
          }
        }
      });
      
      getMovieStatus()
      toast.success(!movieApi?.watched ? 'Filme adicionado aos vistos' : 'Filme removido de vistos');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  async function handleWantWatchMovie(movie_id: number){
    try {   
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id":movie_id,
          "data": {
            "want_watch": !movieApi?.want_watch
          }
        }
      });
  
      getMovieStatus()
      toast.success( !movieApi?.want_watch ? 'Filme adicionado em assistir mais tarde' : 'Filme removido de assistir mais tarde');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  useEffect(() => {
    getMovieDetail();
    getMovieStatus();
  }, []);

  return (
    <DialogContent>
      {movie &&
        <>
          <div className="flex flex-row justify-between">
            <div>
              <DialogHeader>
                {movie.title}
                <DialogDescription>Resumo do filme</DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-muted-foreground" >Lançamento</TableCell>
                      <TableCell className="flex justify-end" >{formatDate(movie.release_date)}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-muted-foreground" >Titulo original</TableCell>
                      <TableCell className="flex justify-end" >{movie.original_title}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="text-muted-foreground" >Popularidade</TableCell>
                      <TableCell className="flex justify-end" >{movie.popularity}</TableCell>
                    </TableRow>

                  </TableBody>
                </Table>

              </div>

            </div>

            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              className="h-60 rounded-sm  ml-10"
            />

          </div>

          <div>
            <DialogDescription>Resumo</DialogDescription>
            <p>
              {movie.overview}
            </p>
          </div>

          {movieApi &&

            <div className="flex flex-row justify-center space-x-1">
              <Button variant='ghost' size='sm' onClick={() => handleFavoriteMovie(movieId)}>
                {
                  movieApi.favorite ?
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <Heart className="w-4 h-4" fill="white"/>
                        <span>Remover</span>
                      </div>
                    </>
                    :
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>Adicionar aos favoritos</span>
                      </div>
                    </>
                }
              </Button>

              <Button variant='ghost' size='sm' onClick={() => handleWantWatchMovie(movieId)}>
              {
                  movieApi.want_watch ?
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <Bookmark className="w-4 h-4" fill="white"/>
                        <span>Remover</span>
                      </div>
                    </>
                    :
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <Bookmark className="w-4 h-4" />
                        <span>Assistir mais tarde</span>
                      </div>
                    </>
                }
              </Button>


              <Button variant='ghost' size='sm' onClick={() => handleWatchedMovie(movieId)}>
              {
                  movieApi.watched ?
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <X className="w-4 h-4"/>
                        <span>Não vi</span>
                      </div>
                    </>
                    :
                    <>
                      <div className="flex flex-row justify-center items-center space-x-1">
                        <Check className="w-4 h-4" />
                        <span>Já vi</span>
                      </div>
                    </>
                }
              </Button>
            </div>
          }
        </>
      }
    </DialogContent>
  )
}