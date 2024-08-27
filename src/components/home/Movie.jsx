import { Box, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Box maxW={"230px"} overflow={"hidden"}>
        <Image
          aspectRatio={"9/14"}
          w={"100%"}
          mb={5}
          objectFit={"cover"}
          borderStyle={"solid"}
          borderWidth={"2px"}
          borderColor={"accent.500"}
          src={movie.image}
          alt={movie.title}
        />
        <Heading as={"h4"} size={"sm"}>
          {movie.title}
        </Heading>
      </Box>
    </Link>
  );
};
export default Movie;
