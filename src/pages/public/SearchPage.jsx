import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryParams } from "../../hooks/useQueryParams";
import { fetchContent } from "../../utils/fetch";

const Search = () => {
  const [movies, setMovies] = useState([]);

  const { urlSearchParams } = useQueryParams();

  const key = urlSearchParams.get("key");
  const value = urlSearchParams.get("value");

  useEffect(() => {
    const getFilteredMovies = async () => {
      const filteredMovies = await fetchContent(
        `/movies/search?key=${key}&value=${value}`,
        {
          method: "GET",
        },
        true
      );
      setMovies(filteredMovies);
    };
    getFilteredMovies();
  }, [key, value]);

  return (
    <Box color={"text.500"}>
      {movies.map((movie) => (
        <Link key={movie.id} to={`/movies/${movie.id}`}>
          <h2>{movie.title}</h2>
          <Text>{movie.description}</Text>
        </Link>
      ))}
    </Box>
  );
};
export default Search;
