import React from 'react';
import './ShoeResults.css';
import ShoeCard from './ShoeCard';

function ShoeResults({ shoes, searchQuery }) {
  return (
    <div className="shoe-results">
      <div className="results-header">
        <h2>Results for "{searchQuery}"</h2>
        <p className="results-count">{shoes.length} shoes found</p>
      </div>
      
      <div className="shoe-grid">
        {shoes.map((shoe) => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
}

export default ShoeResults;
