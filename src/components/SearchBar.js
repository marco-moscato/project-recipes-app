import React from 'react';

function SearchBar() {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        placeholder="digite sua pesquisa"
      />
    </div>
  );
}

export default SearchBar;
