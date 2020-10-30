export const setAirlinesAndReviews = (airlines, reviews) => {
  return {
    type: "SET_AIRLINES",
    airlines: airlines,
    reviews: reviews
  };
};

export const addAirline = (airline) => {
  return {
    type: "ADD_AIRLINE",
    airline: airline
  };
};

export const updateAverageScore = (airlineId) => ({
  type: "UPDATE_AVERAGE_SCORE",
  airlineId: airlineId
});

export const switchFlag = () => ({
  type: "SWITCH_FLAG"
});

export const addError = (errors) => ({
  type: "ADD_ERROR",
  errors: errors
});

export const resetErrors = () => ({
  type: "RESET_ERRORS"
});