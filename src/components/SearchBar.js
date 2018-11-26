import React, { Component } from "react";
import { SearchBox } from "react-instantsearch-dom";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <SearchBox />
      </div>
    );
  }
}

export default SearchBar;
