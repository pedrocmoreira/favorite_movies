import { Helmet } from "react-helmet-async";

import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MoviePosterArtwork } from "@/components/movie-poster-artwork";

import { useEffect, useState } from "react";
import { env } from "@/env";
import { apiMovieDB } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";

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
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<MovieListProps[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  function handleNextPage() {
    setCurrentPage(currentPage + 1);
  }

  function handlePreviousPage() {
    setCurrentPage(currentPage - 1);
  }
  
  // Função para retornar à página inicial
  function resetPage() {
    setSearch('');
    setSearchResults(null);
    setCurrentPage(1);
  }

  function handleCleanSearch() {
    setSearch('');
    setSearchResults(null);
  }

  async function getTopMovies() {
    const { data } = await apiMovieDB('/movie/popular?language=pt-BR', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setTopMovies(data.results);
  }

  async function getNowPlayingMovies() {
    const { data } = await apiMovieDB('/movie/now_playing?language=pt-BR', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${env.VITE_MOVIE_DATABASE_TOKEN}`
      }
    });

    setNowPlayingMovies(data.results);
  }


  async function handleSearchMovie() {
    try {
      const response = await apiMovieDB.get(`/search/movie?language=pt-BR&query=${search}&page=${currentPage}`, {
        headers: {
          'Content-Type': 'appication/json',
          Authorization: `Bearer ${env.VITE_MOVIE_DATABASE_TOKEN}`
        }
      });

      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
    }
  }

  useEffect(() => {
    getTopMovies();
    getNowPlayingMovies();
  }, [])

  useEffect(() => {
    handleSearchMovie();
  }, [currentPage]);
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
                    <div className="flex justify-between space-between  items-center">
                      <TabsList>
                        <TabsTrigger value="films" className="relative">
                          Filmes
                        </TabsTrigger>
                        <TabsTrigger value="favorites">Meus favoritos</TabsTrigger>
                        <TabsTrigger value="watched" disabled> Assistidos </TabsTrigger>
                        <TabsTrigger value="watch-later" disabled> Assistir mais tarde </TabsTrigger>
                      </TabsList>

                      <div className="flex flex-row items-center gap-3">
                        <Input
                          placeholder="Pesquisar filme"
                          className="h-8 w-auto"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        {searchResults?
                          <Button variant='ghost' size='sm' onClick={handleCleanSearch}>
                            <X className="w-4 h4 text-red-500" />
                          </Button>
                          :
                          <Button variant='ghost' size='sm' onClick={handleSearchMovie}>
                            <Search className="w-4 h-4" />
                          </Button>
                        }
                      </div>
                    </div> 
                    {search   ?
                      <>
                        <div className="grid grid-cols-5 gap-4 mt-4">
                          {searchResults && searchResults.map((movie, index) => (
                            <MoviePosterArtwork
                              key={index}
                              movie={movie}
                              className="w-[250px]"
                              aspectRatio="portrait"
                              width={250}
                              height={330}
                            />
                          ))}
                        </div>
                        <div className="flex justify-center mt-4">
                          <Button variant="ghost" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            Anterior
                          </Button>
                          <Button variant="ghost" onClick={handleNextPage}>
                            Próximo
                          </Button>
                        </div>
                      </>
                      :
                      <>
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
                      </>
                    }
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
