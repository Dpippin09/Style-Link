'use client'

import React, { useState, useEffect } from 'react'
import { ExternalLink, Heart, Filter, Grid, List } from 'lucide-react'

interface ShoeProduct {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  retailer: string
  image: string
  affiliateLink: string
  rating: number
  reviews: number
  category: string
  sizes: string[]
}

interface SearchResultsProps {
  query: string
}

// Mock search data - replace with real API integration
const mockSearchResults: ShoeProduct[] = [
  {
    id: '1',
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    originalPrice: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-1.jpg',
    affiliateLink: 'https://nike.com/air-max-270',
    rating: 4.5,
    reviews: 1234,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '2',
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 60,
    retailer: 'Converse.com',
    image: '/placeholder-shoe-2.jpg',
    affiliateLink: 'https://converse.com/chuck-taylor',
    rating: 4.3,
    reviews: 892,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: '3',
    name: 'Stan Smith',
    brand: 'Adidas',
    price: 80,
    originalPrice: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-3.jpg',
    affiliateLink: 'https://adidas.com/stan-smith',
    rating: 4.6,
    reviews: 2156,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '4',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 180,
    originalPrice: 220,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-4.jpg',
    affiliateLink: 'https://adidas.com/ultra-boost',
    rating: 4.7,
    reviews: 987,
    category: 'Running',
    sizes: ['8', '9', '10', '11']
  }
]

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = useState<ShoeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [filterBrand, setFilterBrand] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  useEffect(() => {
    const searchShoes = async () => {
      setLoading(true)
      
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Filter mock results based on query
      let filteredResults = mockSearchResults
      
      if (query) {
        filteredResults = mockSearchResults.filter(shoe =>
          shoe.name.toLowerCase().includes(query.toLowerCase()) ||
          shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
          shoe.category.toLowerCase().includes(query.toLowerCase())
        )
      }
      
      // Apply filters
      if (filterBrand) {
        filteredResults = filteredResults.filter(shoe =>
          shoe.brand.toLowerCase() === filterBrand.toLowerCase()
        )
      }
      
      filteredResults = filteredResults.filter(shoe =>
        shoe.price >= priceRange[0] && shoe.price <= priceRange[1]
      )
      
      // Apply sorting
      if (sortBy === 'price-low') {
        filteredResults.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'price-high') {
        filteredResults.sort((a, b) => b.price - a.price)
      } else if (sortBy === 'rating') {
        filteredResults.sort((a, b) => b.rating - a.rating)
      }
      
      setResults(filteredResults)
      setLoading(false)
    }

    searchShoes()
  }, [query, filterBrand, priceRange, sortBy])

  const handleAffiliateClick = (affiliateLink: string, productName: string) => {
    console.log(`Affiliate click: ${productName}`)
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  const brands = Array.from(new Set(mockSearchResults.map(shoe => shoe.brand)))

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
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Price:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-20"
              />
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                  <div className="text-gray-500 text-center">
                    <div className={viewMode === 'grid' ? 'text-4xl mb-2' : 'text-2xl'}>👟</div>
                    {viewMode === 'grid' && <p className="text-sm">{shoe.brand}</p>}
                  </div>
                </div>
                
                {/* Discount Badge */}
                {shoe.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    {Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)}% OFF
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
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(shoe.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({shoe.reviews})</span>
                </div>

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
                      Shop Now
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
