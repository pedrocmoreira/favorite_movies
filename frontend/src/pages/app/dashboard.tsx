import { Helmet } from "react-helmet-async";

import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoviePosterArtwork } from "@/components/movie-poster-artwork";


export interface Movie {
  name: string
  release_date: string
  cover: string
}

const popularMovies: Movie[]= [
  {
    name: "Duna: Parte Dois",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    name: "Kung Fu Panda 4",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
  },
  {
    name: "Godzilla e Kong: O Novo Império",
    release_date: "2024-02-27",   
    cover:
      "https://image.tmdb.org/t/p/original/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  },
  {
    name: "Matador de Aluguel",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/h2xDLj6CtzItwQEFyBjIXh5z3QD.jpg",
  },
]
const nowPlayingMovies: Movie[]= [
  {
    name: "Duna: Parte Dois",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  },
  {
    name: "Kung Fu Panda 4",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
  },
  {
    name: "Godzilla e Kong: O Novo Império",
    release_date: "2024-02-27",   
    cover:
      "https://image.tmdb.org/t/p/original/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg",
  },
  {
    name: "Matador de Aluguel",
    release_date: "2024-02-27",
    cover:
      "https://image.tmdb.org/t/p/original/h2xDLj6CtzItwQEFyBjIXh5z3QD.jpg",
  },
]

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="hidden md:block">
        {/* <Menu/> */}
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="films" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="films" className="relative">
                          Filmes
                        </TabsTrigger>
                        <TabsTrigger value="favorites">Meus favoritos</TabsTrigger>
                        <TabsTrigger value="watched" disabled>
                          Asistidos
                        </TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="films"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Populares
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Uma lista com os filmes mais populares do momento.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {popularMovies.map((movie) => (
                              <MoviePosterArtwork
                                key={movie.name}
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
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          Em exibição
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Os filmes que estão em exibição nesse momento.
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {nowPlayingMovies.map((movie) => (
                              <MoviePosterArtwork
                                key={movie.name}
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
                    </TabsContent>
                    <TabsContent
                      value="favorites"
                      // className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Seus favoritos
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Esses são os filmes que você salvou como favorito.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />

                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}