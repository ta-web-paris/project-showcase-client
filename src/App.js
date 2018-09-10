import React, { Component } from 'react';
import './App.css';
import { Route, Switch, NavLink, Redirect } from 'react-router-dom';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    };
  }

  userLoggedIn = (user) => {
    this.setState({
      currentUser: user
    });
  }

  render() {
    const {currentUser} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>This is our Project Showcase app!</h1>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/login">Log in</NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/login" render={() => currentUser? <Redirect to="/" /> : <Login handleLogIn={this.userLoggedIn}/> }/>
          <Route component={ ErrorPage }/>
        </Switch>
        <footer></footer>
      </div>
    );
  }
}

export default App;
