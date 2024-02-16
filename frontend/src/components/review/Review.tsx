import { useQuery } from "react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";

interface ReviewProps {
  review: {
    userId: string;
    rating: number;
    comment: string;
  };
}

const Review: React.FC<ReviewProps> = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/img/noavatar.jpg"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars">
        {Array.from({ length: review.rating }).map((_, i) => (
          <img src="/img/star.png" alt="" key={i} />
        ))}
        <span>{review.rating}</span>
      </div>
      <p>{review.comment}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" alt="" />
        <span>Yes</span>
        <img src="/img/dislike.png" alt="" />
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;
