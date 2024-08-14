import React from "react";

const Search = ({ searchItem, setSearchItem }) => {
  return (
    <div className="SearchContainer">
      <input
        className="searchbar"
        type="text"
        placeholde="Search..."
        onChange={(e) => setSearchItem(e.target.value)}
      />
      <button className="search">Search</button>
    </div>
  );
};

export default Search;
