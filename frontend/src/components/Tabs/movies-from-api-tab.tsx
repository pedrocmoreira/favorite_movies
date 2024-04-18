import { MovieFromApi } from "@/pages/app/dashboard";
import { MoviePosterArtworkFromApi } from "../movie-poster-artwork-from-api";
import { Separator } from "../ui/separator";

interface MoviesFromApiProps {
  title: string;
  description: string;
  moviesFromApi: MovieFromApi[]
}

export function MoviesFromApi({title, description, moviesFromApi}: MoviesFromApiProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="relative">
        <div className="grid grid-cols-5 gap-4 mt-4">
          {moviesFromApi && moviesFromApi.map((movie) => (
            <MoviePosterArtworkFromApi
              key={movie.title}
              movie={movie}
              className="w-[200px]"
              aspectRatio="portrait"
              width={150}
              height={150}
            />
          ))}
        </div>
      </div>
    </>
  );
}