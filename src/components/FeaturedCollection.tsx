'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ExternalLink, Heart } from 'lucide-react'

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
}

// Mock data for demonstration - you'll replace this with real API data
const mockShoes: ShoeProduct[] = [
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
    reviews: 1234
  },
  {
    id: '2',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    price: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-2.jpg',
    affiliateLink: 'https://nike.com/jordan-1-retro',
    rating: 4.9,
    reviews: 4532
  },
  {
    id: '3',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 180,
    originalPrice: 220,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-3.jpg',
    affiliateLink: 'https://adidas.com/ultra-boost',
    rating: 4.7,
    reviews: 987
  }
]

const FeaturedCollection = () => {
  const [shoes, setShoes] = useState<ShoeProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchShoes = async () => {
      setLoading(true)
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShoes(mockShoes)
      setLoading(false)
    }

    fetchShoes()
  }, [])

  const handleAffiliateClick = (affiliateLink: string, productName: string) => {
    // Track affiliate click for analytics
    console.log(`Affiliate click: ${productName}`)
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  if (loading) {
    return (
      <section className="py-16 bg-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-gray-600">
              Discover handpicked shoes from top brands and retailers
            </p>
          </div>
          
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Loading featured shoes...</p>
          </div>
        </div>
      </section>
    )
  }

  if (shoes.length === 0) {
    return (
      <section className="py-16 bg-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-lg text-stone-700">
              Discover handpicked shoes from top brands and retailers
            </p>
          </div>
          
          <div className="text-center py-12 bg-stone-300 rounded-xl border border-stone-400 shadow-lg">
            <h3 className="text-xl font-semibold text-stone-900 mb-2">
              No Products Available Right Now
            </h3>
            <p className="text-stone-700 mb-4">
              We&apos;re currently curating the best shoe deals for you.
            </p>
            <p className="text-stone-700">
              Featured products will appear here soon.
            </p>
            <p className="text-stone-700 mt-4">
              Try using the search feature to find shoes, or check back in a few minutes.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Featured Collection
          </h2>
          <p className="text-lg text-stone-700">
            Discover handpicked shoes from top brands and retailers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shoes.map((shoe) => (
            <div
              key={shoe.id}
              className="bg-stone-300 border border-stone-400 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:border-stone-500"
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-100 relative group">
                {/* Placeholder image - you can replace with actual shoe images */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <div className="text-gray-500 text-center">
                    <div className="text-4xl mb-2">👟</div>
                    <p className="text-sm">{shoe.brand}</p>
                  </div>
                </div>
                
                {/* Favorite Button */}
                <button className="absolute top-3 right-3 p-2 bg-stone-300 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity border border-stone-400">
                  <Heart className="h-4 w-4 text-stone-600" />
                </button>

              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-2">
                  <p className="text-sm text-gray-600 font-medium">{shoe.brand}</p>
                  <h3 className="text-lg font-semibold text-black">{shoe.name}</h3>
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

                {/* Price */}
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-black">${shoe.price}</span>
                  {shoe.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">${shoe.originalPrice}</span>
                  )}
                </div>

                {/* Retailer & CTA */}
                <div className="flex items-center justify-between">
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
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-black mb-2">Stay In Style</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get the latest shoe trends, style tips, and exclusive offers delivered to your inbox.
          </p>
          
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-xs text-gray-500 mt-3">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCollection
