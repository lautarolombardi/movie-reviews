import { Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import Loading from "../Loading";
import ReviewList from "./ReviewList";
import UsersList from "./UsersList";

const AdminDashboard = () => {
  const {
    data: users,
    loading: usersLoading,
    sendRequest: getUsers,
  } = useRequest();
  const { sendRequest: deleteUser } = useRequest();
  const { sendRequest: restoreUser } = useRequest();

  const {
    data: reviews,
    loading: reviewsLoading,
    sendRequest: getReviews,
    setData: setReviews,
  } = useRequest();
  const { sendRequest: editReview } = useRequest();
  const { sendRequest: deleteReview } = useRequest();

  const handleUserState = (userId, enabled) => {
    if (enabled) {
      deleteUser(`/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then(() =>
        getUsers("/users", {
          headers: { Authorization: localStorage.getItem("token") },
        })
      );
    } else {
      restoreUser(`/users/${userId}/restore`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }).then(() => {
        getUsers("/users", {
          headers: { Authorization: localStorage.getItem("token") },
        });
      });
    }
  };

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
        getReviews("/reviews", {
          headers: { Authorization: localStorage.getItem("token") },
        })
      );
    } else {
      const reviewsCopy = [...reviews];
      const reviewIndex = reviews.findIndex((review) => review.id === reviewId);
      reviewsCopy[reviewIndex] = {
        ...reviewsCopy[reviewIndex],
        isEditing: true,
      };
      setReviews(reviewsCopy);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    deleteReview(`/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: localStorage.getItem("token") },
    }).then(() =>
      getReviews("/reviews", {
        headers: { Authorization: localStorage.getItem("token") },
      })
    );
  };

  useEffect(() => {
    getUsers(`/users`, {
      headers: { Authorization: localStorage.getItem("token") },
    });

    getReviews(`/reviews`, {
      headers: { Authorization: localStorage.getItem("token") },
    }).then(() =>
      setReviews((reviewsArray) =>
        reviewsArray.map((review) => ({ ...review, isEditing: false }))
      )
    );
  }, [getUsers, getReviews, setReviews]);

  return (
    <Container maxWidth={"6xl"}>
      {usersLoading ? (
        <Loading />
      ) : (
        <UsersList users={users} handleUserState={handleUserState} />
      )}
      {reviewsLoading ? (
        <Loading />
      ) : (
        <>
          <Heading mb={8}>Lista de reseñas</Heading>
          <ReviewList
            reviews={reviews}
            handleEditReview={handleEditReview}
            handleDeleteReview={handleDeleteReview}
          />
        </>
      )}
    </Container>
  );
};
export default AdminDashboard;
