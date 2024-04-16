import { Helmet } from "react-helmet-async";

import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoviePosterArtwork } from "@/components/movie-poster-artwork";

import axios from 'axios';


import { useEffect, useState } from "react";
import { env } from "@/env";
import { apiMovieDB } from "@/lib/axios";


export interface Movie {
  name: string
  release_date: string
  cover: string
}


export interface MovieListProps {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export function Dashboard() {
  const [topMovies, setTopMovies] = useState<MovieListProps[]>();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieListProps[]>();

  async function getTopMovies() {
    const { data } = await apiMovieDB('/movie/popular?language=pt-BR', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setTopMovies(data.results);
  }

  async function getNowPlayingMovies() {
    const { data } = await apiMovieDB('/movie/now_playing?language=pt-BR', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setNowPlayingMovies(data.results);
  }

  useEffect(() => {
    getTopMovies();
    getNowPlayingMovies();
  }, [])
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
                        <TabsTrigger value="watched" disabled> Assistidos </TabsTrigger>
                        <TabsTrigger value="watch-later" disabled> Assistir mais tarde </TabsTrigger>
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
                            {topMovies && topMovies.map((movie) => (
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