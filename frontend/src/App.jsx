import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SkillForm from './components/SkillForm';
import LoginScreen from './components/LoginScreen';
import LoginPopup from './components/LoginPopup';
import UserInfoPopup from './components/UserInfoPopup';
import { fetchResults, fetchIAResponse } from './services/api';
import './styles/index.css';

function App() {
  const [results, setResults] = useState({});
  const [selectedResult, setSelectedResult] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showUserInfoPopup, setShowUserInfoPopup] = useState(false);
  const [user, setUser] = useState(null);
  const [iaResponse, setIaResponse] = useState(null);

  const handleSearch = async (query) => {
    const formattedQuery = query.replace(/\s+/g, '_');
    try {
      const response = await fetchResults(formattedQuery);
      
      if (!response.people || response.people.length === 0) {
        // Si no hay resultados de programación, intentar con IA
        const iaResponseData = await fetchIAResponse(formattedQuery);
        setIaResponse(iaResponseData); // Modificado para usar directamente la respuesta
        setResults({});
      } else {
        setResults(response);
        setIaResponse(null);
      }
    } catch (error) {
      console.error('Error in search:', error);
    }
  };

  const handleResultClick = (result) => {
    setSelectedResult(result);
    setShowUserInfoPopup(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      console.log('Submitting skill:', data);
      setSelectedResult(null);
      setShowForm(false);
      // Optionally refresh the results or user data here
    } catch (error) {
      console.error('Error submitting skill:', error);
    }
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleLogin = async (userData) => {
    try {
      setIsLoggedIn(true);
      setShowLoginPopup(false);
      // Asumiendo que userData ya tiene el id del backend
      setUser(userData);
      console.log('User logged in:', userData);
    } catch (error) {
      console.error('Error setting user data:', error);
    }
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
          <div className="header">
            <h1 className="main-title">Gradiant HackUDC</h1>
            <button onClick={handleOpenUserInfoPopup} className="user-info-button">
              {user?.email || 'Usuario'}
            </button>
          </div>
          
          <SearchBar onSearch={handleSearch} />
          
          <div className="actions-container">
            <button onClick={handleAddButtonClick} className="add-button">
              <span>+</span> Add Skill
            </button>
          </div>
          
          <SearchResults 
            results={results}
            iaResponse={iaResponse}
            onResultClick={handleResultClick}
          />

          {showForm && (
            <SkillForm 
              onSubmit={handleFormSubmit} 
              onClose={handleCloseForm}
              userEmail={user?.email} // Changed from userId to userEmail
            />
          )}

          {showUserInfoPopup && user && (
            <UserInfoPopup 
              user={user} 
              onClose={handleCloseUserInfoPopup} 
              onLogout={handleLogout}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;