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
import { MovieListProps } from "@/pages/app/dashboard"

import { Bookmark, Check, Heart, Search } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { MovieDetail } from "./movie-detail";
import { formatDate } from "@/utils/format-date";
import { api } from "@/lib/axios";
import { toast } from "sonner";


interface MoviePosterArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  movie: MovieListProps
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}



export function MoviePosterArtwork({
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
            "favorite": true
          }
        }
      });


      toast.success('Filme adicionado aos favoritos');
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
            "watched": true
          }
        }
      });

      toast.success('Filme adicionado aos vistos');
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
            "want_watch": true
          }
        }
      });

      toast.success('Filme adicionado em assistir mais tarde');
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
        <ContextMenuItem className="gap-2" onClick={() => handleFavoriteMovie(movie.id)}>
          <Heart className="h-4 w-4" />
          Favoritos
        </ContextMenuItem>
        <ContextMenuItem className="gap-2" onClick={() => handleWantWatchMovie(movie.id)}>
          <Bookmark className="h-4 w-4" />
          Mais tarde
        </ContextMenuItem>
        <ContextMenuItem className="gap-2" onClick={() => handleWatchedMovie(movie.id)}>
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

            <MovieDetail open={isDetailsOpen} movieId={movie.id} />
          </Dialog>
        </div>
        <p className="text-xs text-muted-foreground">Data de lançamento: {movie.release_date ? formatDate(movie.release_date) : 'Sem informações'}</p>
      </div>
    </div>
  )
}
