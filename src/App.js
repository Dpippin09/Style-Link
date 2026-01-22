import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ShoeResults from './components/ShoeResults';
import { searchShoes } from './services/shoeService';

function App() {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setSearchQuery(query);
    try {
      const results = await searchShoes(query);
      setShoes(results);
    } catch (error) {
      console.error('Error searching shoes:', error);
      setShoes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Style-Link</h1>
        <p className="tagline">Find the Best Shoe Deals</p>
      </header>
      
      <main className="App-main">
        <SearchBar onSearch={handleSearch} />
        
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching for shoes...</p>
          </div>
        )}
        
        {!isLoading && shoes.length > 0 && (
          <ShoeResults shoes={shoes} searchQuery={searchQuery} />
        )}
        
        {!isLoading && searchQuery && shoes.length === 0 && (
          <div className="no-results">
            <p>No shoes found for "{searchQuery}"</p>
            <p>Try a different search term</p>
          </div>
        )}
      </main>
      
      <footer className="App-footer">
        <p>© 2026 Style-Link. Prices and availability are subject to change.</p>
        <p className="affiliate-notice">
          Style-Link earns commission on qualifying purchases made through our links.
        </p>
      </footer>
    </div>
  );
}

export default App;
