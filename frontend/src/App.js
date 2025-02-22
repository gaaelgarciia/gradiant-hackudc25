import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SkillForm from './components/SkillForm';
import LoginScreen from './components/LoginScreen';
import LoginPopup from './components/LoginPopup';
import UserInfoPopup from './components/UserInfoPopup';
import { fetchResults } from './services/api';
import './styles/index.css';

function App() {
  const [results, setResults] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = async (query) => {
    const formattedQuery = query.replace(/\s+/g, '_');
    const response = await fetchResults(formattedQuery);
    setResults(response);
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setShowUserInfoPopup(true);
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
    setUser({
      ...userData,
      skills: ["Python", "React", "JavaScript"], // Example skills, replace with actual data
      repositories: ["Repo1", "Repo2"] // Example repositories, replace with actual data
    });
    console.log('User logged in:', userData);
  };

  const handleOpenLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  const handleOpenUserInfoPopup = () => {
    setShowUserInfoPopup(true);
  };

  const handleCloseUserInfoPopup = () => {
    setShowUserInfoPopup(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowUserInfoPopup(false);
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
          <button onClick={handleOpenUserInfoPopup} className="user-info-button">
            Información del Usuario
          </button>
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
          {showUserInfoPopup && (
            <UserInfoPopup user={user} onClose={handleCloseUserInfoPopup} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;