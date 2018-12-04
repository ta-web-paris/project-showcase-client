import React from "react";
import { Hits, Highlight, connectStateResults } from "react-instantsearch-dom";
const Hit = ({ hit }) => (
  <div>
    <div>
      <Highlight hit={hit} attribute="name" tagName="mark" />
    </div>
    <div>
      <Highlight hit={hit} attribute="creators" tagName="mark" />
    </div>
  </div>
);

const ConditionalHits = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <div>
      <Hits hitComponent={Hit} />
    </div>
  ) : null
);

const Home = () => {
  return (
    <div>
      <ConditionalHits />
    </div>
  );
};

export default Home;
