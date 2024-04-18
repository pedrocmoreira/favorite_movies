import { Helmet } from "react-helmet-async";

import { Sidebar } from "@/components/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { MoviePosterArtwork } from "@/components/movie-poster-artwork";

import { useEffect, useState } from "react";
import { env } from "@/env";
import { api, apiMovieDB } from "@/lib/axios";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopularMoviesTab } from "@/components/Tabs/popular-movies-tab";
import { NowPlayinMoviesTab } from "@/components/Tabs/now-playing-movies-tab";
import { MoviesFromApi } from "@/components/Tabs/movies-from-api-tab";

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

export interface MovieFromApi {
  id: number
  movie_id: number
  title: string
  release_date: string
  poster_path: string
  watched: boolean
  favorite: boolean
  want_watch: boolean
  created_at: string
  updated_at: string
  user_id: number
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('films'); 
  const [topMovies, setTopMovies] = useState<MovieListProps[]>();
  const [nowPlayingMovies, setNowPlayingMovies] = useState<MovieListProps[]>();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieFromApi[]>();
  const [watchedMovies, setWatchedMovies] = useState<MovieFromApi[]>();
  const [watchLaterMovies, setWatchLaterMovies] = useState<MovieFromApi[]>();

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
  // function resetPage() {
  //   setSearch('');
  //   setSearchResults(null);
  //   setCurrentPage(1);
  // }

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

  async function getFavoritesMovies() {
    const { data } = await api('/movies/list?favorite=true', {
      method: 'GET',
    });

    setFavoriteMovies(data.movies);
  }

  async function getWatchedMovies() {
    const { data } = await api('/movies/list?watched=true', {
      method: 'GET',
    });

    setWatchedMovies(data.movies);
  }

  async function getWatchLaterMovies() {
    const { data } = await api('/movies/list?want_watch=true', {
      method: 'GET',
    });

    setWatchLaterMovies(data.movies);
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
    getFavoritesMovies();
    getWatchedMovies();
    getWatchLaterMovies()
  }, []);

  useEffect(() => {
    switch (activeTab) {
      case 'films':
        getTopMovies();
        getNowPlayingMovies();
        break;
      case 'favorites':
        getFavoritesMovies();
        break;
      case 'watched':
        getWatchedMovies();
        break;
      case 'watch-later':
        getWatchLaterMovies();
        break;
      default:
        break;
    }
  }, [activeTab]);

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
                  <Tabs defaultValue="films" className="h-full space-y-6"  onValueChange={setActiveTab}>
                    <div className="flex justify-between space-between  items-center">
                      <TabsList>
                        <TabsTrigger value="films" className="relative">
                          Filmes
                        </TabsTrigger>
                        <TabsTrigger value="favorites">Meus favoritos</TabsTrigger>
                        <TabsTrigger value="watched" > Assistidos </TabsTrigger>
                        <TabsTrigger value="watch-later" > Assistir mais tarde </TabsTrigger>
                      </TabsList>

                      <div className="flex flex-row items-center gap-3">
                        <Input
                          placeholder="Pesquisar filme"
                          className="h-8 w-auto"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        {searchResults ?
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
                    {search ?
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
                          {topMovies &&
                            <PopularMoviesTab title="Populares" description="Os filmes mais populares do momento" popularMovies={topMovies} />
                          }
                          {
                            nowPlayingMovies &&
                            <NowPlayinMoviesTab title="Em exibição" description="Os filmes que estão em exibição nesse momento." nowPlayingMovies={nowPlayingMovies} />
                          }
                        </TabsContent>
                        <TabsContent
                          value="favorites"
                          className="h-full flex-col border-none p-0 data-[state=active]:flex"
                        >
                          {
                            favoriteMovies &&
                            <MoviesFromApi title="Favoritos" description="Esses são os filmes que você salvou como favorito." moviesFromApi={favoriteMovies} />
                          }
                        </TabsContent>
                        <TabsContent
                          value="watched"
                          className="border-none p-0 outline-none"
                        >
                          {
                            watchedMovies && 
                            <MoviesFromApi title="Assistidos" description="Esses são os filmes que você marcou como assistidos" moviesFromApi={watchedMovies} /> 
                          }
                        </TabsContent>
                        <TabsContent
                          value="watch-later"
                          className="border-none p-0 outline-none"
                        >
                          {
                            watchLaterMovies && 
                            <MoviesFromApi title="Assistir mais tarde" description="Esses são os filmes que você marcou para ver mais tarde" moviesFromApi={watchLaterMovies} /> 
                          }
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
