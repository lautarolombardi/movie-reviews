import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/useRequest";
import ReviewList from "./ReviewList";

const UserDashboard = () => {
  const {
    data: userData,
    sendRequest: getUserData,
    setData: setUserData,
  } = useRequest();
  const { sendRequest: editReview } = useRequest();
  const { sendRequest: deleteReview } = useRequest();
  const { user } = useAuthContext();

  const handleEditReview = async (e, reviewId, isEditing) => {
    e.preventDefault();

    if (isEditing) {
      const formData = new FormData(e.target);
      const description = formData.get("description");
      const calification = formData.get("calification");

      const newReview = {
        description,
        calification,
      };

      editReview(`/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(newReview),
      }).then(() =>
        getUserData(`/users/${user.id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        })
      );
    } else {
      const reviewsCopy = [...userData.reviews];
      const reviewIndex = userData.reviews.findIndex(
        (review) => review.id === reviewId
      );
      reviewsCopy[reviewIndex] = {
        ...reviewsCopy[reviewIndex],
        isEditing: true,
      };
      setUserData({ ...userData, reviews: reviewsCopy });
    }
  };

  const handleDeleteReview = async (reviewId) => {
    deleteReview(`/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("token") },
    }).then(() =>
      getUserData(`/users/${user.id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      })
    );
  };

  useEffect(() => {
    getUserData(`/users/${user.id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  }, [getUserData, user.id]);

  return (
    <Container maxW={"6xl"}>
      <Heading mb={8}>Mis reseñas</Heading>
      <ReviewList
        reviews={userData?.reviews}
        handleEditReview={handleEditReview}
        handleDeleteReview={handleDeleteReview}
      />
    </Container>
  );
};
export default UserDashboard;
