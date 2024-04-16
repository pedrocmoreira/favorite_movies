import { cn } from "@/lib/utils"
import {
  ContextMenu,
  // ContextMenuContent,
  // ContextMenuItem,
  // ContextMenuSeparator,
  // ContextMenuSub,
  // ContextMenuSubContent,
  // ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "./ui/context-menu"
import { MovieListProps } from "@/pages/app/dashboard"

import { parse, format } from 'date-fns';
import { Search } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { MovieDetail } from "./movie-detail";


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


  function formatDate(data: string): string {

    const dataParseada = parse(data, 'MM-dd-yyyy', new Date());


    const dataFormatada = format(dataParseada, 'dd/MM/yyyy');

    return dataFormatada;
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
        {/* <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem>Play Next</ContextMenuItem>
          <ContextMenuItem>Play Later</ContextMenuItem>
          <ContextMenuItem>Create Station</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent> */}
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

            <MovieDetail open={isDetailsOpen} movieId={movie.id}/>
          </Dialog>
        </div>
        <p className="text-xs text-muted-foreground">Data de lançamente: {movie.release_date}</p>
      </div>
    </div>
  )
}
