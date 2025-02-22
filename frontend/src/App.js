import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SkillForm from './components/SkillForm';
import LoginScreen from './components/LoginScreen';
import LoginPopup from './components/LoginPopup';
import { fetchResults } from './services/api';
import './styles/index.css';

function App() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    console.log('User logged in:', userData);
  };

  const handleOpenLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <>
          <LoginScreen onLogin={handleOpenLoginPopup} />
          {showLoginPopup && (
            <LoginPopup onClose={handleCloseLoginPopup} onLogin={handleLogin} />
          )}
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;