import { Box, Container, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" py={5}>
      <Container
        maxW={"6xl"}
        display={"flex"}
        height={"max-content"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text letterSpacing={2} fontWeight={"bold"}>
          Lautaro Lombardi - 2024
        </Text>
      </Container>
    </Box>
  );
};
export default Footer;
