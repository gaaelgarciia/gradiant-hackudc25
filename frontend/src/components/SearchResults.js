// import React from 'react';
import React, { useState } from 'react';

// const handleResultClick = (person) => {
const SearchResults = ({ results }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleResultClick = (person) => {
    setSelectedPerson(person);
  };

  const handleClosePopup = () => {
    setSelectedPerson(null);
  };

  if (!results || !results.people || results.people.length === 0) {
    return <div className="search-results">No results found</div>;
  }

  return (
    <div className="search-results">
      <h2>{results.skill} Skills</h2>
      <div className="results-list">
        {results.people.map((person, index) => (
          <div key={index} className="result-item" onClick={() => handleResultClick(person)}>
            <span className="person-name">{person.name}</span>
            <span className="skill-level">Level: {person.level}</span>
          </div>
        ))}
      </div>
      {selectedPerson && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h3>{selectedPerson.id}</h3>
            <h3>{selectedPerson.name}</h3>
            <p>Skill Level: {selectedPerson.level}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
// }

// const SearchResults = ({ results }) => {
//   if (!results || !results.people || results.people.length === 0) {
//     return <div className="search-results">No results found</div>;
//   }

//   return (
//     <div className="search-results">
//       <h2>{results.skill} Skills</h2>
//       <div className="results-list">
//         {results.people.map((person, index) => (
//           <div key={index} className="result-item" onClick={() => handleResultClick(person)}>
//             <span className="person-name">{person.name}</span>
//             <span className="skill-level">Level: {person.level}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;