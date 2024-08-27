import { Button, Heading, Input } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/useRequest";
import Comment from "./Comment";

const CommentList = ({ reviewId }) => {
  const { sendRequest: commentsRequest } = useRequest();
  const { data: reviewData, sendRequest: reviewRequest } = useRequest();
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();

  const sendComment = async (newComment) => {
    commentsRequest("/comments", {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-type": "application/json",
      },
      body: JSON.stringify(newComment),
    }).then(() => reviewRequest(`/reviews/${reviewId}`));
  };

  const handleSendComment = (e) => {
    e.preventDefault();

    if (!isAuthenticated) navigate("/login");

    const formData = new FormData(e.target);
    const comment = formData.get("comment");

    const newComment = {
      text: comment,
      review: reviewId,
      user: user.id,
    };

    sendComment(newComment);
  };

  useEffect(() => {
    reviewRequest(`/reviews/${reviewId}`);
  }, [reviewId, reviewRequest]);

  return (
    <div>
      <Heading fontSize={"1.3rem"} mb={3}>
        Comentarios
      </Heading>
      {reviewData?.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <form onSubmit={handleSendComment}>
        <Input type="text" name="comment" />
        <Button type="submit" mt={5} colorScheme="accent">
          Enviar comentario
        </Button>
      </form>
    </div>
  );
};
export default CommentList;
