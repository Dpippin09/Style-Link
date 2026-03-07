'use client'

import React, { useState, useEffect } from 'react'
import { ExternalLink, Heart, Filter, Grid, List } from 'lucide-react'
import { searchEbayProducts } from '@/utils/ebayApi'
import { getEbayAffiliateLink } from '@/utils/ebay'

interface ShoeProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  retailer: string;
  image: string;
  affiliateLink: string;
  rating?: number;
  reviews?: number;
  category?: string;
  sizes?: string[];
}

interface SearchResultsProps {
  query: string
}

// eBay OAuth token (for demo/testing; move to env/secure storage in production)
const EBAY_OAUTH_TOKEN = 'v^1.1#i^1#r^0#f^0#I^3#p^1#t^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';

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = useState<ShoeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [filterBrand, setFilterBrand] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  useEffect(() => {
    const fetchEbayResults = async () => {
      setLoading(true);
      try {
        let ebayResults: ShoeProduct[] = [];
        if (query) {
          const response = await fetch(`/api/ebay/search?q=${encodeURIComponent(query)}&limit=12`);
          const data = await response.json();
          ebayResults = (data.itemSummaries || []).map((item: any) => ({
            id: item.itemId,
            name: item.title,
            brand: item.brand || 'eBay',
            price: item.price?.value ? Number(item.price.value) : 0,
            retailer: 'eBay',
            image: item.image?.imageUrl || '/icons/ebayLogo.png',
            affiliateLink: getEbayAffiliateLink(item.itemWebUrl),
            rating: undefined,
            reviews: undefined,
            category: item.categoryPath,
            sizes: undefined,
          }));
        }
        // Apply filters
        let filteredResults = ebayResults;
        if (filterBrand) {
          filteredResults = filteredResults.filter(shoe =>
            shoe.brand.toLowerCase() === filterBrand.toLowerCase()
          );
        }
        filteredResults = filteredResults.filter(shoe =>
          shoe.price >= priceRange[0] && shoe.price <= priceRange[1]
        );
        // Apply sorting
        if (sortBy === 'price-low') {
          filteredResults.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          filteredResults.sort((a, b) => b.price - a.price);
        }
        setResults(filteredResults);
      } catch (err) {
        setResults([]);
      }
      setLoading(false);
    };
    fetchEbayResults();
  }, [query, filterBrand, priceRange, sortBy]);

  const handleAffiliateClick = (affiliateLink: string, productName: string) => {
    console.log(`Affiliate click: ${productName}`)
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  const brands = Array.from(new Set(results.map(shoe => shoe.brand)))

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Filters */}
        <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        {/* Loading Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-800" />
              <span className="text-sm font-medium text-gray-900">Filters:</span>
            </div>
            
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-900 bg-white"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-900">Price:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-20"
              />
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
                          <span className="text-sm text-gray-900">${priceRange[1]}</span>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-900 bg-white"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {results.length} results {query && `for "${query}"`}
        </p>
      </div>

      {/* Results Grid/List */}
      {results.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-black mb-2">
            No shoes found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {results.map((shoe) => (
            <div
              key={shoe.id}
              className={viewMode === 'grid'
                ? 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
                : 'bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300'
              }
            >
              {/* Product Image */}
              <div className={viewMode === 'grid'
                ? 'aspect-square bg-gray-100 relative group'
                : 'w-24 h-24 bg-gray-100 rounded-lg relative flex-shrink-0'
              }>
                {shoe.brand === 'Adidas' ? (
                  <img
                    src="/icons/adidasLogo.png"
                    alt="Adidas Logo"
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                ) : shoe.brand === 'Nike' ? (
                  <img
                    src="/icons/nikeLogo.png"
                    alt="Nike Logo"
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                ) : shoe.brand === 'Jordan' ? (
                  <img
                    src="/icons/jordanLogo.png"
                    alt="Jordan Logo"
                    className="absolute inset-0 w-full h-full object-contain p-6"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                    <div className="text-gray-500 text-center">
                      <div className={viewMode === 'grid' ? 'text-4xl mb-2' : 'text-2xl'}>👟</div>
                      {viewMode === 'grid' && <p className="text-sm">{shoe.brand}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className={viewMode === 'grid' ? 'p-6' : 'flex-1'}>
                <div className="mb-2">
                  <p className="text-sm text-gray-600 font-medium">{shoe.brand}</p>
                  <h3 className={viewMode === 'grid' ? 'text-lg font-semibold text-black' : 'text-base font-semibold text-black'}>
                    {shoe.name}
                  </h3>
                </div>

                {/* Rating */}
                {shoe.rating && shoe.reviews && (
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(shoe.rating!) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">({shoe.reviews})</span>
                  </div>
                )}

                {/* Price & Actions */}
                <div className={viewMode === 'grid' 
                  ? 'space-y-4'
                  : 'flex items-center justify-between'
                }>
                  <div className="flex items-baseline">
                    <span className={viewMode === 'grid' ? 'text-2xl font-bold text-black' : 'text-xl font-bold text-black'}>
                      ${shoe.price}
                    </span>
                    {shoe.originalPrice && (
                      <span className={viewMode === 'grid' ? 'ml-2 text-lg text-gray-500 line-through' : 'ml-2 text-base text-gray-500 line-through'}>
                        ${shoe.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className={viewMode === 'grid' 
                    ? 'flex items-center justify-between'
                    : 'flex items-center gap-4'
                  }>
                    <span className="text-sm text-gray-600">at {shoe.retailer}</span>
                    <button
                      onClick={() => handleAffiliateClick(shoe.affiliateLink, shoe.name)}
                      className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      {shoe.retailer ? `Buy at ${shoe.retailer.replace(/\..*$/, '')}` : 'Buy Now'}
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
