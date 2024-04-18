import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  // ContextMenuContent,
  // ContextMenuItem,
  // ContextMenuSeparator,
  // ContextMenuSub,
  // ContextMenuSubContent,
  // ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { MovieFromApi } from "@/pages/app/dashboard"

import { toast } from 'sonner';

import { Bookmark, Check, Heart, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { MovieDetail } from "./movie-detail";
import { formatDate } from "@/utils/format-date";
import { api } from "@/lib/axios";


interface MoviePosterArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: MovieFromApi
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function MoviePosterArtworkFromApi({
  movie,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: MoviePosterArtworkProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  async function handleFavoriteMovie(movie_id: number) {
    try {
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id": movie_id,
          "data": {
            "favorite": !movie.favorite
          }
        }
      });


      toast.success(!movie.favorite ? 'Filme adicionado aos favoritos' : 'Fime removido dos favoritos');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  async function handleWatchedMovie(movie_id: number) {
    try {
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id": movie_id,
          "data": {
            "watched": !movie.watched
          }
        }
      });

      toast.success(!movie.watched ? 'Filme adicionado aos vistos' : 'Filme removido de vistos');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  async function handleWantWatchMovie(movie_id: number) {
    try {
      await api('/movies/update', {
        method: 'POST',
        data: {
          "movie_id": movie_id,
          "data": {
            "want_watch": !movie.want_watch
          }
        }
      });

      toast.success(!movie.want_watch ? 'Filme adicionado em assistir mais tarde' : 'Filme removido de assistir mais tarde');
    } catch (error) {
      toast.error('Não foi possível completar requisição');
    }
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className={`h-auto w-auto object-cover transition-all hover:scale-105 ${aspectRatio === "portrait" ? "aspect-h-6 aspect-w-5" : "aspect-square"}`}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem className="gap-2" onClick={() => handleFavoriteMovie(movie.movie_id)}>
            <Heart className="h-4 w-4" />
            Favoritos
          </ContextMenuItem>
          <ContextMenuItem className="gap-2" onClick={() => handleWantWatchMovie(movie.movie_id)}>
            <Bookmark className="h-4 w-4" />
            Mais tarde
          </ContextMenuItem>
          <ContextMenuItem className="gap-2" onClick={() => handleWatchedMovie(movie.movie_id)}>
            <Check className="h-4 w-4" />
            Já vi
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="space-y-1 text-sm">
        <div className="flex flex-row justify-between">
          <h3 className="font-medium leading-none">{movie.title}</h3>

          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogTrigger>
              <Button variant='outline' size='xss'>
                <Search className="h-3 w-3" />
              </Button>
            </DialogTrigger>

            <MovieDetail open={isDetailsOpen} movieId={movie.movie_id} />
          </Dialog>
        </div>
        <p className="text-xs text-muted-foreground">Data de lançamento: {movie.release_date ? formatDate(movie.release_date) : 'Sem informações'}</p>
      </div>
    </div>
  )
}
