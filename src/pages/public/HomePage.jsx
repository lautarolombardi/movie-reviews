import { useEffect } from "react";
import MovieList from "../../components/home/MovieList";
import Loading from "../../components/Loading";
import { useRequest } from "../../hooks/useRequest";

export const HomePage = () => {
  const { data: movies, loading, sendRequest: getMovies } = useRequest();

  useEffect(() => {
    getMovies(`/movies`);
  }, [getMovies]);

  return loading ? <Loading /> : <MovieList movies={movies} />;
};
