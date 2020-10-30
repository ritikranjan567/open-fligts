import React from 'react';
import {connect} from 'react-redux';
import {resetErrors} from '../actions/airlinesActions'

class AlertError extends React.Component{
  
  componentDidUpdate(){
    setTimeout(() => (this.props.resetErrors()), 3000);
  }

  handleClick = () => (this.props.resetErrors())
  
  render(){
    let {errors} = this.props;
    if (errors.length === 0){
      return null;
    }
    const errorList = errors.map((error, index) => {
      return <li key={index}>{error}</li>
    });

    return (
      <div id="alert_info">
        <div id="close_button" onClick={this.handleClick}>&times;</div>
        <h3>Opps!!</h3>
        <ul>
          {errorList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors
  }
};

const mapDispatchToProps = (dispatch) => ({
  resetErrors: () => (dispatch(resetErrors()))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertError);