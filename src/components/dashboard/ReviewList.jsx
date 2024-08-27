import { Box } from "@chakra-ui/react";
import Review from "./Review";
const ReviewList = ({ reviews, handleEditReview, handleDeleteReview }) => {
  return (
    <Box>
      {reviews?.length > 0 ? (
        reviews.map((review) => (
          <Review
            key={review.id}
            review={review}
            handleEditReview={handleEditReview}
            handleDeleteReview={handleDeleteReview}
          />
        ))
      ) : (
        <p>No hay reseñas</p>
      )}
    </Box>
  );
};
export default ReviewList;
