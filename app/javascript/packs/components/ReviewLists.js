import React from 'react';

const ReviewLists = ({reviews, handleDeleteReview, handleEditReview}) => {
  if (reviews.length > 0){
    return(
      reviews.map((review) => (
        <div className="review-container" key={review.attributes.id}>
          <h3>{review.attributes.title}</h3>
          <p>{review.attributes.description}</p>
          <p>{review.attributes.score} / 5</p>
          <div className="review-buttons">
            <button onClick={() => handleDeleteReview(review.attributes.id)}>Delete</button>
            <button onClick={() => handleEditReview(review.attributes.id)}>Edit</button>
          </div>
        </div>
      ))
    );
  }
  return <p>There are no reviews yet.</p>
}

export default ReviewLists;