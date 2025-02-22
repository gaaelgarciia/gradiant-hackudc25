import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { fetchResults } from './services/api';
import './styles/index.css';

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const data = await fetchResults(query);
    setResults(data);
  };

  return (
    <div className="container">
      <h1>Person Skills Search</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

export default App;