import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import { useAuthContext } from "../../context/AuthContext";
import { useRequest } from "../../hooks/useRequest";

const MovieDetailPage = () => {
  const { id: movieId } = useParams();
  const {
    data: movie,
    loading: movieLoading,
    sendRequest: movieRequest,
  } = useRequest();
  const { sendRequest: reviewRequest } = useRequest();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();

  const sendReview = async (newReview) => {
    reviewRequest(`/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(newReview),
    }).then(() => movieRequest(`/movies/${movieId}`));
  };

  const handleSendReview = (e, userRating) => {
    e.preventDefault();

    if (!isAuthenticated) return navigate("/login");

    const formData = new FormData(e.target);
    const description = formData.get("description");

    const newReview = {
      description,
      calification: parseInt(userRating),
      user: user?.id,
      movie: movieId,
    };

    sendReview(newReview);
  };

  useEffect(() => {
    movieRequest(`/movies/${movieId}`);
  }, [movieId, movieRequest]);

  return movieLoading ? (
    <Loading />
  ) : (
    <MovieDetail movie={movie} handleSendReview={handleSendReview} />
  );
};
export default MovieDetailPage;
