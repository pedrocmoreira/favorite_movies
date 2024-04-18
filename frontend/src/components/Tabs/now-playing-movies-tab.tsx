import { MovieListProps } from "@/pages/app/dashboard";
import { MoviePosterArtwork } from "../movie-poster-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface NowPlayingProps {
  title: string;
  description: string;
  nowPlayingMovies: MovieListProps[]
}

export function NowPlayinMoviesTab({ title, description, nowPlayingMovies }: NowPlayingProps) {
  return (
    <>
      <div className="mt-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {nowPlayingMovies && nowPlayingMovies.map((movie) => (
              <MoviePosterArtwork
                key={movie.title}
                movie={movie}
                className="w-[150px]"
                aspectRatio="square"
                width={150}
                height={150}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}