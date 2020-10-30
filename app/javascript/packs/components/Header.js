import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
    super(props);
    this.state = { date: new Date()};
  }
  componentDidMount(){
    this.timerId = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerId);
  }

  tick(){
    this.setState({date: new Date()});
  }

  render(){
    return(
      <header>
        <Link to="/">
        <h1 id="heading_logo">Open Flights</h1>
        </Link>
        <h4>{this.state.date.toLocaleDateString() + ", " + this.state.date.toLocaleTimeString()}</h4>
      </header>
    );
  }
}

export default Header;