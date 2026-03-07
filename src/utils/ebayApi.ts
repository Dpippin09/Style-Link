// Utility to search eBay products using the Browse API
// Requires a valid OAuth token and search query

// Use the sandbox endpoint for development
const EBAY_API_ENDPOINT = 'https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search';

/**
 * Searches eBay for products using the Browse API.
 * @param {string} query - The search keywords (e.g., 'shoes').
 * @param {string} oauthToken - The OAuth access token for eBay API.
 * @param {number} [limit=10] - Number of results to return.
 * @returns {Promise<any>} - The search results from eBay.
 */
export async function searchEbayProducts(query: string, oauthToken: string, limit: number = 10): Promise<any> {
  const url = `${EBAY_API_ENDPOINT}?q=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${oauthToken}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(`eBay API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
