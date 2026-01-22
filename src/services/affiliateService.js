// Affiliate configuration for different retailers
const affiliateConfig = {
  'Nike.com': {
    partnerId: 'stylelink-nike',
    tag: 'ref=stylelink'
  },
  'Adidas.com': {
    partnerId: 'stylelink-adidas',
    tag: 'ref=stylelink'
  },
  'Amazon': {
    partnerId: 'stylelink-20',
    tag: 'tag=stylelink-20'
  },
  'Foot Locker': {
    partnerId: 'stylelink-fl',
    tag: 'ref=stylelink'
  },
  'Zappos': {
    partnerId: 'stylelink-zappos',
    tag: 'ref=stylelink'
  },
  'Dick\'s Sporting Goods': {
    partnerId: 'stylelink-dsg',
    tag: 'ref=stylelink'
  },
  'New Balance': {
    partnerId: 'stylelink-nb',
    tag: 'ref=stylelink'
  },
  'Puma.com': {
    partnerId: 'stylelink-puma',
    tag: 'ref=stylelink'
  },
  'Converse.com': {
    partnerId: 'stylelink-converse',
    tag: 'ref=stylelink'
  },
  'Running Warehouse': {
    partnerId: 'stylelink-rw',
    tag: 'ref=stylelink'
  }
};

/**
 * Generate an affiliate link for a retailer
 * @param {string} url - Original retailer URL
 * @param {string} retailerName - Name of the retailer
 * @returns {string} - URL with affiliate parameters
 */
export const generateAffiliateLink = (url, retailerName) => {
  const config = affiliateConfig[retailerName];
  
  if (!config) {
    // If no affiliate config exists, return original URL
    return url;
  }
  
  // Add affiliate parameters to URL
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${config.tag}&partner=${config.partnerId}`;
};

/**
 * Track click on retailer link for analytics and commission tracking
 * @param {number} shoeId - ID of the shoe
 * @param {string} retailerName - Name of the retailer
 */
export const trackClick = (shoeId, retailerName) => {
  const clickData = {
    shoeId,
    retailerName,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId()
  };
  
  // Log click event (in production, this would send to analytics service)
  console.log('Click tracked:', clickData);
  
  // Store click in local storage for demo purposes
  const clicks = JSON.parse(localStorage.getItem('stylelink_clicks') || '[]');
  clicks.push(clickData);
  localStorage.setItem('stylelink_clicks', JSON.stringify(clicks));
  
  // In production, you would send this to your backend:
  // fetch('/api/track-click', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(clickData)
  // });
};

/**
 * Get or create a session ID for tracking
 * @returns {string} - Session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('stylelink_session');
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('stylelink_session', sessionId);
  }
  
  return sessionId;
};

/**
 * Get click statistics (for admin/analytics purposes)
 * @returns {Array} - Array of click data
 */
export const getClickStats = () => {
  return JSON.parse(localStorage.getItem('stylelink_clicks') || '[]');
};
