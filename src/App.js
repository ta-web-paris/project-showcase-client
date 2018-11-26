import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import api from "./api.js";
import Home from "./components/HomePage/Home";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import SettingsPage from "./components/SettingsPage";
import HeaderHome from "./components/HomePage/HeaderHome";

//InstantSearch - data provider. It's like the BrowserRouter in react-router (index.js)
import { InstantSearch } from "react-instantsearch-dom";
import "instantsearch.css/themes/algolia-min.css";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  //app ID
  process.env.REACT_APP_algoliaAppID,

  //Search-Only API Key
  process.env.REACT_APP_algoliaSearchKey
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginChecked: false,
      currentUser: null
    };
  }

  componentDidMount() {
    api
      .get("/check-login")
      .then(response => {
        const { userDoc } = response.data;
        this.userLoggedIn(userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error.");
      });
  }

  userLoggedIn = user => {
    console.log("New USER\n", user);
    this.setState({
      isLoginChecked: true,
      currentUser: user
    });
  };

  logUserOut = () => {
    api
      .delete("/logout")
      .then(response => {
        const { userDoc } = response.data;
        this.userLoggedIn(userDoc);
      })
      .catch(err => {
        console.log(err);
        alert("Sorry, there was an error");
      });
  };

  render() {
    const { isLoginChecked, currentUser } = this.state;
    return (
      <div className="App">
        {/* index name is what i called the data on algolia */}
        <InstantSearch searchClient={searchClient} indexName="dev_data">
          <HeaderHome currentUser={currentUser} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/login"
              render={() =>
                currentUser ? (
                  <Redirect to="/" />
                ) : (
                  <Login handleLogIn={this.userLoggedIn} />
                )
              }
            />
            <Route
              path="/settings"
              render={() =>
                isLoginChecked && !currentUser ? (
                  <Redirect to="/login" />
                ) : (
                  <SettingsPage currentUser={currentUser} />
                )
              }
            />
            <Route component={ErrorPage} />
          </Switch>
        </InstantSearch>
        <footer />
      </div>
    );
  }
}

export default App;
