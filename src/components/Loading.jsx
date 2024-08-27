import { Container, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container
      maxW={"6xl"}
      height={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} color="accent.500" />
    </Container>
  );
};
export default Loading;
