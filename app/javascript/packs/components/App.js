import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Airline from './Airline';

class App extends React.Component{

  render(){
    return(
      <div className="app-container">
        <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route path="/airlines/:id" component={Airline} />
        </Switch>
      </div>
    );
  }
}

export default App;