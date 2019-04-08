import React, { Component } from "react";
import { SearchBox } from "react-instantsearch-dom";

import './style/SearchBox.scss';

class SearchBar extends Component {
  render() {
    return (
      <section id="SearchBox">
        <SearchBox />
        <img className="algoliaLogo" src="../../../images/algolia-logo.svg" alt="algolia logo" />
      </section>
    );
  }
}

export default SearchBar;
