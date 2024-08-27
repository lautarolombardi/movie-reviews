import { Box, Text } from "@chakra-ui/react";

const Comment = ({ comment }) => {
  return (
    <Box mb={5}>
      <Text as={"span"} fontWeight={"bold"} fontSize={"1.1rem"}>
        {comment.user.name}{" "}
      </Text>
      comenta: {comment.text}
    </Box>
  );
};
export default Comment;
