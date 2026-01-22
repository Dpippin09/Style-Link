import React from 'react';
import './ShoeCard.css';
import { generateAffiliateLink, trackClick } from '../services/affiliateService';

function ShoeCard({ shoe }) {
  const handleRetailerClick = (retailer) => {
    trackClick(shoe.id, retailer.name);
  };

  // Find the best deal
  const bestDeal = shoe.retailers.reduce((best, current) => 
    current.price < best.price ? current : best
  );

  return (
    <div className="shoe-card">
      <div className="shoe-image-container">
        <img src={shoe.image} alt={shoe.name} className="shoe-image" />
        {shoe.brand && <div className="shoe-brand">{shoe.brand}</div>}
      </div>
      
      <div className="shoe-info">
        <h3 className="shoe-name">{shoe.name}</h3>
        
        <div className="price-comparison">
          <h4>Available at:</h4>
          <div className="retailers-list">
            {shoe.retailers.map((retailer, index) => (
              <div 
                key={index} 
                className={`retailer-item ${retailer.name === bestDeal.name ? 'best-deal' : ''}`}
              >
                <div className="retailer-info">
                  <span className="retailer-name">{retailer.name}</span>
                  <span className="retailer-price">${retailer.price.toFixed(2)}</span>
                  {retailer.name === bestDeal.name && (
                    <span className="best-deal-badge">Best Deal!</span>
                  )}
                </div>
                <a
                  href={generateAffiliateLink(retailer.url, retailer.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="buy-button"
                  onClick={() => handleRetailerClick(retailer)}
                >
                  Go to Store
                </a>
              </div>
            ))}
          </div>
        </div>
        
        {bestDeal && (
          <div className="savings-info">
            Save up to ${(Math.max(...shoe.retailers.map(r => r.price)) - bestDeal.price).toFixed(2)} by choosing the best deal!
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoeCard;
