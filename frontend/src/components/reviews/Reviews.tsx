import React, { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";

const Reviews = ({ jobId }: { jobId: string }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/jobs/${jobId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation<void, Error, { jobId: string; comment: string; rating: number }>(
    (review) => newRequest.post("/reviews", review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"]);
      },
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const descInput = form.querySelector('input[name="comment"]') as HTMLInputElement;
    const ratingSelect = form.querySelector('select[name="rating"]') as HTMLSelectElement;
  
    const comment = descInput.value;
    const rating = parseInt(ratingSelect.value, 10);
  
    mutation.mutate({ jobId, comment, rating });
        // Reset the input field after submitting the form
        descInput.value = "";
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review: any) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" name="comment" placeholder="write your opinion" />
          <h4 className="reviewAdd">Add ratings</h4>
          <select name="rating" id="rating">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
