import { Box, Button, HStack, Input } from "@chakra-ui/react";

const Review = ({ review, handleEditReview, handleDeleteReview }) => {
  return (
    <HStack>
      <Box marginRight={3}>
        Descripción de la reseña: {review.description} - Calificación:{" "}
        {review.calification} - Reseña hecha por: {review.user?.name}
      </Box>
      {review.isEditing ? (
        <form onSubmit={(e) => handleEditReview(e, review.id, true)}>
          <Input
            type="text"
            name="description"
            required
            placeholder="Descripción"
          />
          <Input
            type="number"
            name="calification"
            min={1}
            max={5}
            placeholder="Calificación"
          />
          <Button type="submit" colorScheme="green">
            Guardar
          </Button>
        </form>
      ) : (
        <>
          <Button
            colorScheme="yellow"
            onClick={(e) => handleEditReview(e, review.id, false)}
          >
            Editar
          </Button>
          <Button
            colorScheme="red"
            onClick={() => handleDeleteReview(review.id)}
          >
            Eliminar
          </Button>
        </>
      )}
    </HStack>
  );
};
export default Review;
