import React from 'react';

const SearchResults = ({ results }) => {
  if (!results || !results.people || results.people.length === 0) {
    return <div className="search-results">No results found</div>;
  }

  return (
    <div className="search-results">
      <h2>{results.skill} Skills</h2>
      <div className="results-list">
        {results.people.map((person, index) => (
          <div key={index} className="result-item">
            <span className="person-name">{person.name}</span>
            <span className="skill-level">Level: {person.level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;