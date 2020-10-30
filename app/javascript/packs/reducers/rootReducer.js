
const initialState = {
  airlines: [],
  reviews: [],
  //airline: {}
  formEdit: {
    mode: "new",
    reviewId: null,
    review: {
      id: null,
      title: "",
      description: "",
      score: 2
    },
    flag: false
  },
  errors: []
};

const rootReducer = (state = initialState, action) => {
  //console.log(state.formEdit.flag);
  switch(action.type){
    case "SET_AIRLINES":
      return {
        ...state,
        airlines: action.airlines,
        reviews: action.reviews
      };
    case "ADD_AIRLINE":
      return {
        ...state,
        airline: action.airline
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((review) => (review.attributes.id !== action.reviewId))
      }
    case "SET_FORM_EDIT_MODE":
      if (action.mode === "new"){
        return {
          ...state, formEdit: initialState.formEdit
        }
      }
      //console.log(action)
      return {
        ...state,
        formEdit: { ...state.formEdit,
          mode: action.mode, reviewId: action.reviewId
        }
      }
    case "SET_REVIEW":
      return {
        ...state,
        formEdit: {
          ...state.formEdit, review: action.review
        }
      }
    case "SET_FORM_DATA":
      return{
        ...state,
        formEdit: {...state.formEdit, review: 
          {...state.formEdit.review, [action.element.id]: action.element.value} }
      }
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: state.reviews.concat(action.reviewArray)
      }
    case "EDIT_REVIEW":
      let reviews = state.reviews.map((review) => {
        if (Number(review.attributes.id) === Number(action.newReview.attributes.id)){
          return review = action.newReview;
        }
        else{
          return review;
        }
      });
      return {
        ...state,
        reviews: reviews
      }

    case "UPDATE_AVERAGE_SCORE":
      return {
        ...state,
        airlines: state.airlines.map((airline) => {
          if (Number(airline.attributes.id) === Number(action.airlineId)){
            let reviews = state.reviews.filter((review) => (Number(review.attributes.airline_id) === Number(action.airlineId)));
            if (reviews.length === 0) {
              return {...airline, attributes: {
                ...airline.attributes, avg_score: 0
              }}
            }
            let total = reviews.reduce((ttl, review) => { return ttl += Number(review.attributes.score) }, 0)
            //console.log(reviews, total);
            return {...airline, attributes: {
              ...airline.attributes, avg_score: Number((total / reviews.length).toFixed(2))
            }}
          }
          else{
            return airline
          }
        })
      }
    case "SWITCH_FLAG":
      return {
        ...state,
        formEdit: {...state.formEdit, flag: !state.formEdit.flag}
      }

    case "ADD_ERROR":
      return {
        ...state,
        errors: state.errors.concat(action.errors)
      }

    case "RESET_ERRORS":
      return {
        ...state,
        errors: initialState.errors
      }

    default:
      return state;
  } 
};

export default rootReducer;