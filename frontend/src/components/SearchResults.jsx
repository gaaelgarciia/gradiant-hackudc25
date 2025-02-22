import React, { useState } from 'react';

const getSkillLevelColor = (level) => {
  switch (level) {
    case 1:
      return '#ff4d4d'; // Rojo - Principiante
    case 2:
      return '#ffa64d'; // Naranja - Básico
    case 3:
      return '#ffff4d'; // Amarillo - Intermedio
    case 4:
      return '#a3c100'; // Verde claro - Avanzado
    case 5:
      return '#00cc00'; // Verde oscuro - Experto
    default:
      return '#666666'; // Gris - Nivel no definido
  }
};

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
      <h2>{results.skills.join(' & ')} Skills</h2>
      <div className="results-list">
        {results.people.map((person, index) => (
          <div key={index} className="result-item" onClick={() => handleResultClick(person)}>
            <div className="person-info">
              <span className="person-name">{person.name}</span>
              <div className="skills-list">
              {person.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="skill-level"
                    style={{
                      backgroundColor: getSkillLevelColor(skill.level),
                      color:'#000',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      margin: '0 4px',
                      fontWeight: '500'
                    }}
                  >
                    {skill.skill}: Level {skill.level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPerson && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>&times;</span>
            <h3>{selectedPerson.name}</h3>
            <p>Email: {selectedPerson.email}</p>
            <h4>Skills:</h4>
            <ul>
            {selectedPerson.skills.map((skill, idx) => (
                <li 
                  key={idx}
                  style={{
                    backgroundColor: getSkillLevelColor(skill.level),
                    color: '#000',
                    padding: '8px',
                    borderRadius: '4px',
                    marginBottom: '4px',
                    listStyle: 'none'
                  }}
                >
                  {skill.skill}: Level {skill.level}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;