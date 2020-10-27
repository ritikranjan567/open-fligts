import React from 'react';
import { connect } from 'react-redux';
import { setFormData, addReview, setReview, editReview, setFormEditMode } from '../actions/reviewsAction';
import { updateAverageScore, switchFlag } from '../actions/airlinesActions';
const axios = require('axios');

class ReviewForm extends React.Component {
  //flag = true
  /* componentDidMount() {
    let { reviewId } = this.props;
    let review;
    if (reviewId === null)
      review = { attributes: { id: null, title: "", description: "", } };
    else
      review = (this.props.reviews.find((review) => { return parseInt(review.attributes.id) === reviewId }));
    this.props.setReview(review.attributes);
  } */

  //switchFlag = () => (this.flag = !this.flag)

  componentDidUpdate() {
    //console.log("Update")
    let { reviewId } = this.props;
    let review = this.props.reviews.find((review) => { return parseInt(review.attributes.id) === reviewId });
    if (review && this.props.flag) {
      console.log(review);
      this.props.switchFlag()
      this.props.setReview(review.attributes);
    }
  }
  handleChange = (event) => {
    //console.log(event.target)
    this.props.setFormData(event.target);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let method = (this.props.mode === "new")? "post":"put"
    let url = (method === "post")? "/api/v1/reviews":("/api/v1/reviews/" + this.props.reviewId);
    let review = this.props.review;
    let airlineId = this.props.airlineId;
    let data = {
      review: {
        ...review, airline_id: airlineId
      }
    }
    let {addReview, editReview, updateAverageScore, setFormEditMode} = this.props;
    //let sf = this.props.switchFlag;
    axios({
      method: method,
      url: url,
      data: data,
    }).then((res) => {
      console.log("success");
      (method === "post")? addReview([res.data.data]) : editReview(res.data.data);
      updateAverageScore(airlineId);
      setFormEditMode("new", null);
      //sf();
    })
    .catch((error) => console.error(error));
  }

  handleReset = (e) => {
    const review = {title: "", description: "", score: 2};
    this.props.setReview(review);
    //this.switchFlag();
  }

  render() {
    const {mode} = this.props;
    //this.method = (mode === "new")? "post":"put";
    //console.log(method)
    //console.log(this.props.review)
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>{mode.charAt(0).toUpperCase() + mode.slice(1)} review</h2>
        <label htmlFor="title">Title:</label>
        <input type="text" required={true} className="review-inputs" id="title" value={this.props.review.title} onChange={this.handleChange} /> <br />
        <label htmlFor="description">Brief your experience:</label>
        <input type="text" className="review-inputs" id="description" required={true} value={this.props.review.description} onChange={this.handleChange} /> <br />
        <br />
        <label htmlFor="score">Score the services(out of 5):</label>
        <input type="number" min="1" max="5" className="review-score" value={this.props.review.score} onChange={this.handleChange} id="score"/> / 5 <br /> <br />
        <input type="submit" value="Submit Review" className="review-form-button" />
        <input type="reset" valut="Reset" className="review-form-button" onClick={this.handleReset}/>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state.formEdit);
  return {
    reviews: state.reviews,
    mode: state.formEdit.mode,
    reviewId: state.formEdit.reviewId,
    review: state.formEdit.review,
    flag: state.formEdit.flag
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFormData: (element) => (dispatch(setFormData(element))),
  setReview: (review) => (dispatch(setReview(review))),
  addReview: (reviewArray) => (dispatch(addReview(reviewArray))),
  editReview: (newReview) => (dispatch(editReview(newReview))),
  updateAverageScore: (airlineId) => (dispatch(updateAverageScore(airlineId))),
  setFormEditMode: (mode, reviewId) => (dispatch(setFormEditMode(mode, reviewId))),
  switchFlag: () => (dispatch(switchFlag()))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);