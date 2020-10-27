import React from 'react';
import { connect } from 'react-redux';
import {setAirlinesAndReviews, updateAverageScore, switchFlag} from '../actions/airlinesActions';
import {deleteReview, setFormEditMode} from '../actions/reviewsAction';
import ReviewForm from './ReviewForm';
import ReviewLists from './ReviewLists';

const axios = require('axios');

class Airline extends React.Component{
  
  componentDidMount(){
    //console.log("component did mount")
    if (!this.props.airline){
      axios.get(`/api/v1/airlines/${Number(this.props.match.params.id)}`)
        .then(res => {
          //console.log(res.data)
          this.props.setAirlinesAndReviews([res.data.data], res.data.included)
        })
        .catch(error => console.error(error))     
    }
  }
  handleDeleteReview = (reviewId) => {
    this.props.deleteReview(reviewId);
    axios.delete("/api/v1/reviews/" + Number(reviewId))
      .then((res) => {
        console.log("deleted");
        this.props.updateAverageScore(this.props.match.params.id)
      })
      .catch((error) => (console.error(error)));
  }

  handleEditReview = (reviewId) => {
    //console.log(reviewId);
    this.props.setFormEditMode("edit", reviewId);
    this.props.switchFlag();
  }
  
  render(){
    let {airline, reviews} = this.props;
    //console.log(airline)
    /* console.log(reviews) */
    if (!airline){
      //console.log("true")
      return null;
    }
    return(
      <div className="show-airline-container">
        <div className="show-airline">
          <img src={airline.attributes.image_url} alt="Logo Image" className="show-logo" />
          <h3 align="center">{airline.attributes.name}</h3>
          <p align="center">Rating: {airline.attributes.avg_score} / 5</p>
          <br/>
          <hr />
          <h2>Reviews</h2> <hr />
          <div className="reviews-container">
            <ReviewLists reviews={reviews} handleDeleteReview={this.handleDeleteReview} handleEditReview={this.handleEditReview} />
          </div>
        </div>
        <div className="review-form">
          <ReviewForm airlineId={airline.attributes.id} />
        </div>
      </div>
    );
  };
}


const mapStateToProps = (state, ownProps) => {
  let airline_id = Number(ownProps.match.params.id);
  //console.log(state)
  if (state.airlines.length > 0){
    //console.log("Not happening")
    return {
      airline: state.airlines.find((airline) => (airline.attributes.id === airline_id)),
      reviews: state.reviews.filter((review) => 
        (Number(review.attributes.airline_id) === airline_id))
    }
  }
  return state;
  /*
  return {
    airline: state.airline.data,
    reviews: state.airline.included
  }*/
};

const mapDispatchToProps = (dispatch) => {
  return{
    setAirlinesAndReviews: (airlines, reviews) => (dispatch(setAirlinesAndReviews(airlines, reviews))),
    deleteReview: (reviewId) => (dispatch(deleteReview(reviewId))),
    setFormEditMode: (mode, reviewId) => (dispatch(setFormEditMode(mode, reviewId))),
    updateAverageScore: (airlineId) => (dispatch(updateAverageScore(airlineId))),
    switchFlag: () => (dispatch(switchFlag()))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Airline);