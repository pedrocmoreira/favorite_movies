import { MovieListProps } from "@/pages/app/dashboard";
import { DialogContent, DialogDescription, DialogHeader } from "./ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Bookmark, Check, Heart } from "lucide-react";
import { apiMovieDB } from "@/lib/axios";
import { env } from "@/env";
import { useEffect, useState } from "react";
import { MovieDetailDTO } from "@/dto/movie-details-dto";

export interface MovieDetail {
  data: MovieListProps;
  open: boolean;
}

export function MovieDetail({ data, open }: MovieDetail) {
  const [movie, setMovie] = useState<MovieDetailDTO>();

  function formatDate(date: string): string {
    const dateParts = date.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    return `${day}/${month}/${year}`;
  }

  async function getMovieDetail() {
    const response = await apiMovieDB(`/movie/${data.id}?language=pt-BR`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setMovie(response.data);
  }

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <DialogContent>
      {movie &&
        <>
          <div className="flex flex-row justify-between">
            <div>
              <DialogHeader>
                {data.title}
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
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              className="h-60 rounded-sm  ml-10"
            />

          </div>

          <div>
            <DialogDescription>Resumo</DialogDescription>
            <p>
              {data.overview}
            </p>
          </div>

          <div className="flex flex-row justify-center space-x-1">
            <Button variant='ghost' size='sm' about="teste">
              <div className="flex flex-row justify-center items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>Adicionar aos favoritos</span>
              </div>
            </Button>

            <Button variant='ghost' size='sm' about="teste">
              <div className="flex flex-row justify-center items-center space-x-1">
                <Bookmark className="w-4 h-4" />
                <span>Assistir mais tarde</span>
              </div>
            </Button>


            <Button variant='ghost' size='sm' about="teste">
              <div className="flex flex-row justify-center items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Já assisti</span>
              </div>
            </Button>
          </div>
        </>
      }
    </DialogContent>
  )
}