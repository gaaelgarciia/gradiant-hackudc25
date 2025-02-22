import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for skills..."
        />
      </form>
    </div>
  );
};

export default SearchBar;