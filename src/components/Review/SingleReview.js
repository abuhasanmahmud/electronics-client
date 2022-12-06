import React from "react";

const SingleReview = ({ review }) => {
  return (
    <div className="my-5 shadow-sm mx-4 py-5">
      <p>{review.name}</p>
      <p>{review.comment}</p>
    </div>
  );
};

export default SingleReview;
