import { Box, Text } from "@chakra-ui/react";

const Review = ({ review }) => {
  return (
    <Box fontSize={"1.2rem"}>
      <Text as={"span"} fontWeight={"bold"}>
        {review.user?.name}
      </Text>{" "}
      dice: {review.description}
    </Box>
  );
};
export default Review;
