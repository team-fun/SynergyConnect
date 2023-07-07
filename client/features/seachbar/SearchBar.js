import React from "react";

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input
        type="search"
        placeholder="search chat rooms"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
