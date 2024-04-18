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
