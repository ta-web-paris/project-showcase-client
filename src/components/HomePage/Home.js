import React from "react";
import { Hits, Highlight, connectStateResults } from "react-instantsearch-dom";
import { Thumb } from "./ProjectThumbnail";
import Filters from "./FilterButton";

const Result = ({ hit }) => (
  <div>
    <div>
      <Thumb src={hit.screenshotUrl} alt={hit.name} objectID={hit.objectID} />
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
      {/* Hits gets all of the results and maps over them and passes each individual result to the hitComponent. It will render multiple Result components each with their own hit as a prop */}
      <Hits hitComponent={Result} />
      {/* Result is the reference to the "Single Hit" component */}
    </div>
  ) : (
    <Hits hitComponent={Result} />
  )
);

// imaginary implementation of ReactInstantSearch.Hits
// const Hits = ({ hitComponent }) => {
//   const hits = this.algoliastate.hits; // i.e. the results
//   const Tag = hitComponent;
//   return hits.map(hit => <Tag hit={hit} key={hit.objectID} />);
// };

const Home = () => {
  return (
    <div>
      <Filters />
      <ConditionalHits />
    </div>
  );
};

export default Home;
