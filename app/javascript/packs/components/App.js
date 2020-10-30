import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Airline from './Airline';
import NoMatch from './NoMatch';
import AlertError from './AlertError';

class App extends React.Component{

  render(){
    return(
      <div className="app-container">
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/airlines/:id" component={Airline} />
          <Route path="*" component={NoMatch} />
        </Switch>
        <AlertError />
      </div>
    );
  }
}

export default App;