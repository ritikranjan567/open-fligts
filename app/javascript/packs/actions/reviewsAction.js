export const deleteReview = (reviewId) => {
  return{
    type: "DELETE_REVIEW",
    reviewId: reviewId
  };
};

export const setFormEditMode = (mode, reviewId) => (
  {
    type: "SET_FORM_EDIT_MODE",
    mode: mode,
    reviewId: reviewId
  }
);

export const setFormData = (element) => ({
  type: "SET_FORM_DATA",
  element: element
});

export const addReview = (reviewArray) => ({
  type: "ADD_REVIEW",
  reviewArray: reviewArray
});

export const setReview = (review) => ({
  type: "SET_REVIEW",
  review: review
});

export const editReview = (newReview) => ({
  type: "EDIT_REVIEW",
  newReview: newReview
})