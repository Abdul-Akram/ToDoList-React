import React from "react";

const Search = ({ searchItem, setSearchItem }) => {
  return (
    <div className="SearchContainer">
      <input
        className="searchbar"
        type="text"
        placeholder="Search..."
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
      />
    </div>
  );
};

export default Search;
