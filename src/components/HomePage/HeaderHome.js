import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HomeHeader extends Component {
  state = {};

  logUserOut(event) {
    console.log("gogoggogogo", this.props);
    this.setState({ isLoginChecked: false });
  }

  render() {
    const { currentUser, logUserOut } = this.props;
    return (
      <div>
        <header className="App-header">
          <h1>This is our Project Showcase app!</h1>
          <NavLink exact to="/">
            Home
          </NavLink>
          {currentUser ? (
            <React.Fragment>
              <NavLink to="/settings">User Settings</NavLink>
              <b>{currentUser.email}</b>
              <button onClick={event => logUserOut(event)}>Log out</button>
            </React.Fragment>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
        </header>
      </div>
    );
  }
}

export default HomeHeader;
