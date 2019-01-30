import React, { Component } from "react";
import { connectRefinementList } from "react-instantsearch-dom";

import "./style/FilterButton.scss";

class RawFilter extends Component {
  state = { open: false };
  render() {
    const { attribute, items, refine } = this.props;
    // console.log(this.props);

    return (
      <div>
        <button onClick={() => this.setState(({ open }) => ({ open: !open }))}>
          {attribute}
        </button>
        <div className="RefinementList-container">
          {this.state.open && (
            <ul>
              {items.map(e => {
                return (
                  <li key={e.label}>
                    <label>
                      <input
                        type="checkbox"
                        checked={e.isRefined}
                        onChange={() => refine(e.value)}
                      />
                      {e.label}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const Filter = connectRefinementList(RawFilter);

class Filters extends Component {
  state = {};
  render() {
    return (
      <section id="Filters">
        <div className="container">
          <div className="row">
            <Filter attribute="bootcamp" />
            <Filter attribute="squad" />
            <Filter attribute="projectType" />
          </div>
        </div>
        {/* we need to alter out model for the project filter (front, fullstack, react etc) */}
        {/* <RefinementList attribute="project" /> */}
      </section>
    );
  }
}

export default Filters;
