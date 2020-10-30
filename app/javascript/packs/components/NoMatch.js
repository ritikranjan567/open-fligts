import React from 'react';
import '../../../assets/stylesheets/application.css'

const NoMatch = () => {
  return (
    <div className="no-match">
      <h1>404 Request URL Not Found</h1>
      <hr />
      <h3>So you like playing with the URL...</h3>
      <h4>Unfortunately, your entered URL that takes you nowhere..</h4>
    </div>
  );
};

export default NoMatch;