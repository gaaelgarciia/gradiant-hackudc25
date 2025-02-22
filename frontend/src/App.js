import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SkillForm from './components/SkillForm';
import { fetchResults } from './services/api';
import './styles/index.css';

function App() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = async (query) => {
    const data = await fetchResults(query);
    setResults(data);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
    setSelectedResult(null); // Reset selected result after form submission
    setShowForm(false); // Hide form after submission
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container">
      <h1>Person Skills Search</h1>
      <SearchBar onSearch={handleSearch} />
      <button onClick={handleAddButtonClick} className="add-button">
        <span>+</span> Add Skill
      </button>
      {showForm ? (
        <SkillForm onSubmit={handleFormSubmit} selectedResult={selectedResult} onClose={handleCloseForm} />
      ) : (
        <SearchResults results={results} onResultClick={handleResultClick} />
      )}
    </div>
  );
}

export default App;