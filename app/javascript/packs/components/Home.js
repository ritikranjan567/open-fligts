import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAirlinesAndReviews } from '../actions/airlinesActions';
const axios = require('axios');

class Home extends React.Component{
  
  componentDidMount(){
    axios.get("/api/v1/airlines")
      .then( res => {
        this.props.setAirlinesAndReviews(res.data.data, res.data.included)
      })
      .catch( error => (console.error(error)));
  }

  render(){
    //console.log(this.props)
    const { airlines } = this.props;
    let airlinesListDOM = null;
    if (airlines.length > 0){
      airlinesListDOM = airlines.map((airline) => {
        let { attributes } = airline;
        return (
          <div className="card-airline" key={attributes.id}>
            <img src={attributes.image_url} className="card-img" />
            <h4 align="center">{attributes.name}</h4>
            <div className='card-show-link'>
              <Link to={"/airlines/" + attributes.id} className="card-show-link">
                See it
              </Link>
            </div>
          </div>
        );
      });
    }
    else{
      airlinesListDOM = <p>There are no airlines</p>
    }

    return (
      <div className="card-container">
        {airlinesListDOM}
      </div>
    );
  }    
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state)
  return {
    airlines: state.airlines
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    setAirlinesAndReviews: (airlines, reviews) => 
    {dispatch(setAirlinesAndReviews(airlines, reviews))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);