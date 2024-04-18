import { MovieListProps } from "@/pages/app/dashboard";
import { MoviePosterArtwork } from "../movie-poster-artwork";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface PopularMovieProps {
  title: string;
  description: string;
  popularMovies: MovieListProps[]
}

export function PopularMoviesTab({ title, description, popularMovies }: PopularMovieProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {/* Populares */}
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {popularMovies && popularMovies.map((movie) => (
              <MoviePosterArtwork
                key={movie.title}
                movie={movie}
                className="w-[250px]"
                aspectRatio="portrait"
                width={250}
                height={330}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}