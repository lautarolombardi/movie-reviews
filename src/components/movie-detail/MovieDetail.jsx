import {
  Box,
  Button,
  Container,
  FormLabel,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { useState } from "react";
import ReviewList from "./ReviewList";

const MovieDetail = ({ movie, handleSendReview }) => {
  const [userRating, setUserRating] = useState("1");

  const calcAverageRate = (reviews) => {
    if (reviews?.length === 0) return 0;
    const rates = reviews?.map((review) => review.calification);
    const totalRate = rates?.reduce((acc, rate) => acc + rate, 0);
    return totalRate / rates?.length;
  };

  return (
    <Container maxW={"6xl"}>
      <Stack direction={"row"} mb={"4rem"}>
        <Image
          src={movie?.image}
          alt={movie?.title}
          w={"100%"}
          maxW={"xs"}
          mr={10}
        />
        <Box>
          <Text as={"h2"} mb={5} fontWeight={"bold"} fontSize={"2rem"}>
            {movie?.title}
          </Text>
          <p>{movie?.description}</p>
          <Text my={5}>
            Promedio de calificación:{" "}
            {calcAverageRate(movie?.reviews).toFixed(1)}
          </Text>
          <Box
            as="form"
            mt={5}
            onSubmit={(e) => handleSendReview(e, userRating)}
          >
            <FormLabel htmlFor="calification">Calificación:</FormLabel>
            <RadioGroup
              mb={10}
              onChange={setUserRating}
              name="calification"
              value={userRating}
            >
              <Stack direction="row" spacing={5}>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
                <Radio value="4">4</Radio>
                <Radio value="5">5</Radio>
              </Stack>
            </RadioGroup>
            <FormLabel htmlFor="description">
              Descripción de la reseña:
            </FormLabel>
            <Textarea
              mb={8}
              name="description"
              display={"block"}
              placeholder="Deja una reseña"
              maxW={"md"}
              required
            />
            <Button colorScheme="accent" type="submit">
              Enviar reseña
            </Button>
          </Box>
        </Box>
      </Stack>
      <ReviewList reviews={movie?.reviews} />
    </Container>
  );
};
export default MovieDetail;
