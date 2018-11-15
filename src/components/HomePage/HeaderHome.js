import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HomeHeader extends Component {
  state = {};
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <header className="App-header">
          <NavLink exact to="/">
            Home
          </NavLink>
          {currentUser ? (
            <React.Fragment>
              <NavLink to="/settings">User Settings</NavLink>
              <b>{currentUser.email}</b>
              <button onClick={this.logUserOut}>Log out</button>
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
