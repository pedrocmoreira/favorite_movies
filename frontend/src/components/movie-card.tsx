interface MovieCardProps {
  title: string;
  poster: string;
  aspectRatio: string;
}

export function MovieCard({title, poster, aspectRatio = "portrait"}: MovieCardProps) {
  return (
    <div className="overflow-hidden rounded-md">
      <img
        src={`https://image.tmdb.org/t/p/original${poster}`}
        alt={title}
        className={`h-auto w-auto object-cover transition-all hover:scale-105 ${aspectRatio === "portrait" ? "aspect-h-6 aspect-w-5" : "aspect-square"}`}
      />
    </div>
  )
}