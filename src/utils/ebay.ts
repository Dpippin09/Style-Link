// Utility to generate eBay affiliate links with your campaign ID

const EBAY_CAMPAIGN_ID = '5339144311';

/**
 * Generates an eBay affiliate link from a base eBay URL.
 * @param {string} url - The original eBay item or search URL.
 * @returns {string} - The affiliate-enabled URL.
 */
export function getEbayAffiliateLink(url: string): string {
  try {
    const u = new URL(url);
    // Add or update the campid parameter
    u.searchParams.set('campid', EBAY_CAMPAIGN_ID);
    return u.toString();
  } catch (e) {
    // If invalid URL, return as is
    return url;
  }
}
