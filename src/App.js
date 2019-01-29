import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

//------------- ALGOLIA --------------
import algoliasearch from "algoliasearch/lite";
//InstantSearch - data provider. It's like the BrowserRouter in react-router (index.js)
import { InstantSearch } from "react-instantsearch-dom";

import ErrorPage from "./components/ErrorPage";
import "./script";
import api from "./api.js";
import HeaderHome from "./components/HomePage/HeaderHome";
import AddProject from "./components/AddProjectPage/AddProject";
import ProjectsList from "./components/ProjectsList";
import ProjectHeader from "./components/ProjectPage/HeaderProject";

//----------------- ADMIN ONLY  ------------
import Login from "./components/Login";
import SettingsPage from "./components/SettingsPage";
import EditProject from "./components/Admin/EditProject";
import NotVerified from "./components/Admin/NotVerified";
import Verified from "./components/Admin/Verified";

//------------------ STYLING -----------
import "./style/App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import "../node_modules/instantsearch.css/themes/reset-min.css"

library.add(fab, faCheckSquare, faCoffee);

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
    this.setState({
      isLoginChecked: true,
      currentUser: user
    });
  };

  logUserOut = event => {
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
      <div id="App">
        {/* index name is what i called the data on algolia */}
        <InstantSearch searchClient={searchClient} indexName="search_data">
          <HeaderHome
            currentUser={currentUser}
            logUserOut={event => this.logUserOut(event)}
          />

          <Switch>
            <Route exact path="/" component={ProjectsList} />

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
            <Route path="/add-project" component={AddProject} />
            <Route path="/projects/:projectId" component={ProjectHeader} />

            <Route
              path="/notverified"
              render={() =>
                isLoginChecked && !currentUser ? (
                  <Redirect to="/login" />
                ) : (
                  <NotVerified />
                )
              }
            />

            <Route
              path="/verified"
              render={() =>
                isLoginChecked && !currentUser ? (
                  <Redirect to="/login" />
                ) : (
                  <Verified />
                )
              }
            />

            <Route
              path="/edit"
              render={() =>
                isLoginChecked && !currentUser ? (
                  <Redirect to="/login" />
                ) : (
                  <EditProject />
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
