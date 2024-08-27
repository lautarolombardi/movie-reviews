import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import CommentList from "./CommentList";
import Review from "./Review";

const ReviewList = ({ reviews }) => {
  return (
    <div>
      <Text mb={5} as={"h2"} fontWeight={"bold"} fontSize={"1.8rem"}>
        Reseñas de la película
      </Text>
      {reviews?.length > 0 ? (
        <Accordion allowToggle>
          {reviews.map((review) => (
            <AccordionItem key={review.id}>
              {({ isExpanded }) => (
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <Review review={review} />
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel p={3}>
                    {isExpanded && <CommentList reviewId={review.id} />}
                  </AccordionPanel>
                </h2>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p>No hay reseñas</p>
      )}
    </div>
  );
};
export default ReviewList;
