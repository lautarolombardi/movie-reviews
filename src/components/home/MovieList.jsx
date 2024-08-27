import { Container } from "@chakra-ui/react";
import Movie from "./Movie";

const MovieList = ({ movies, loading }) => {
  return (
    <Container
      display={"grid"}
      gridTemplateColumns={"repeat(auto-fill, minmax(230px,1fr))"}
      justifyItems={"center"}
      rowGap={10}
      justifyContent={"center"}
      maxW={"6xl"}
    >
      {loading && <p>Loading...</p>}
      {movies?.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </Container>
  );
};
export default MovieList;
