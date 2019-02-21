import React, { Component } from "react";
import { SearchBox } from "react-instantsearch-dom";

import './style/SearchBox.scss';

class SearchBar extends Component {
  render() {
    return (
      <section id="SearchBox">
        <SearchBox />
      </section>
    );
  }
}

export default SearchBar;
