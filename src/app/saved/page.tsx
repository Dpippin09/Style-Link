'use client'

import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Heart, ExternalLink, X, Bell, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface SavedItem {
  id: string
  name: string
  brand: string
  currentPrice: number
  originalPrice?: number
  lowestPrice: number
  highestPrice: number
  retailer: string
  affiliateLink: string
  image: string
  dateAdded: string
  priceAlert: boolean
  inStock: boolean
}

export default function SavedItemsPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: '1',
      name: 'Air Max 270',
      brand: 'Nike',
      currentPrice: 150,
      originalPrice: 180,
      lowestPrice: 135,
      highestPrice: 180,
      retailer: 'Nike.com',
      affiliateLink: 'https://nike.com/air-max-270',
      image: '/placeholder-shoe.jpg',
      dateAdded: '2026-01-15',
      priceAlert: true,
      inStock: true
    },
    {
      id: '2',
      name: 'Stan Smith',
      brand: 'Adidas',
      currentPrice: 85,
      lowestPrice: 75,
      highestPrice: 95,
      retailer: 'Adidas.com',
      affiliateLink: 'https://adidas.com/stan-smith',
      image: '/placeholder-shoe.jpg',
      dateAdded: '2026-01-10',
      priceAlert: false,
      inStock: true
    },
    {
      id: '3',
      name: 'Chuck Taylor All Star',
      brand: 'Converse',
      currentPrice: 65,
      lowestPrice: 55,
      highestPrice: 70,
      retailer: 'Converse.com',
      affiliateLink: 'https://converse.com/chuck-taylor',
      image: '/placeholder-shoe.jpg',
      dateAdded: '2026-01-08',
      priceAlert: true,
      inStock: false
    }
  ])

  const removeItem = (id: string) => {
    setSavedItems(savedItems.filter(item => item.id !== id))
  }

  const togglePriceAlert = (id: string) => {
    setSavedItems(savedItems.map(item => 
      item.id === id ? { ...item, priceAlert: !item.priceAlert } : item
    ))
  }

  const handleShopNow = (affiliateLink: string) => {
    // In a real implementation, this would track the click for analytics
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  if (savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-stone-200">
        <Header />
        <main className="bg-stone-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-stone-300 rounded-xl p-12 border border-stone-400 shadow-lg max-w-md mx-auto">
              <Heart className="h-16 w-16 text-stone-600 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-stone-900 mb-4">No saved items yet</h1>
              <p className="text-stone-700 mb-8">
                Start saving shoes you love to track prices and get alerts when they go on sale.
              </p>
              <Link 
                href="/"
                className="inline-block bg-stone-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-stone-900 transition-colors"
              >
                Discover Shoes
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-200">
      <Header />
      
      <main className="bg-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 font-sans tracking-wide">
              Saved Items
            </h1>
            <p className="text-stone-700">
              Track prices on your favorite shoes and get notified when they go on sale
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-stone-300 rounded-lg p-6 border border-stone-400 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Total Saved</p>
                  <p className="text-2xl font-bold text-stone-900">{savedItems.length}</p>
                </div>
                <Heart className="h-8 w-8 text-stone-600" />
              </div>
            </div>
            
            <div className="bg-stone-300 rounded-lg p-6 border border-stone-400 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">Price Alerts</p>
                  <p className="text-2xl font-bold text-stone-900">
                    {savedItems.filter(item => item.priceAlert).length}
                  </p>
                </div>
                <Bell className="h-8 w-8 text-stone-600" />
              </div>
            </div>
            
            <div className="bg-stone-300 rounded-lg p-6 border border-stone-400 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-600">In Stock</p>
                  <p className="text-2xl font-bold text-stone-900">
                    {savedItems.filter(item => item.inStock).length}
                  </p>
                </div>
                <ShoppingBag className="h-8 w-8 text-stone-600" />
              </div>
            </div>
          </div>

          {/* Saved Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedItems.map((item) => (
              <div key={item.id} className="bg-stone-300 rounded-xl border border-stone-400 shadow-lg overflow-hidden group">
                {/* Remove Button */}
                <div className="relative">
                  <div className="aspect-square bg-stone-100 flex items-center justify-center border-b border-stone-400">
                    <div className="text-stone-600 text-center">
                      <div className="text-4xl mb-2">👟</div>
                      <p className="text-sm">{item.brand}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 p-2 bg-stone-200 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-stone-100"
                  >
                    <X className="h-4 w-4 text-stone-700" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-stone-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-stone-700">{item.brand}</p>
                    <p className="text-xs text-stone-600">From {item.retailer}</p>
                  </div>

                  {/* Price Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-stone-900">
                        ${item.currentPrice}
                      </span>
                      {item.originalPrice && item.originalPrice > item.currentPrice && (
                        <span className="text-sm text-stone-600 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between text-xs text-stone-600">
                      <span>Low: ${item.lowestPrice}</span>
                      <span>High: ${item.highestPrice}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={() => togglePriceAlert(item.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                        item.priceAlert
                          ? 'bg-stone-800 text-white hover:bg-stone-900'
                          : 'bg-stone-400 text-stone-900 hover:bg-stone-500'
                      }`}
                    >
                      <Bell className="h-4 w-4" />
                      {item.priceAlert ? 'Alert On' : 'Set Alert'}
                    </button>
                    
                    <button
                      onClick={() => handleShopNow(item.affiliateLink)}
                      disabled={!item.inStock}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-colors ${
                        item.inStock
                          ? 'bg-stone-800 text-white hover:bg-stone-900'
                          : 'bg-stone-500 text-stone-300 cursor-not-allowed'
                      }`}
                    >
                      <ExternalLink className="h-4 w-4" />
                      {item.inStock ? 'Shop Now' : 'Out of Stock'}
                    </button>
                  </div>

                  {/* Date Added */}
                  <p className="text-xs text-stone-600 mt-3">
                    Saved {new Date(item.dateAdded).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-12 bg-stone-300 rounded-xl p-6 border border-stone-400 shadow-lg">
            <h3 className="font-bold text-stone-900 mb-4">💡 Tips for Saving Money</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-stone-700">
              <div>
                <p className="font-medium mb-1">Set Price Alerts</p>
                <p>Get notified when your saved shoes go on sale or drop to your target price.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Compare Across Retailers</p>
                <p>The same shoe might be cheaper at different stores. We track them all for you.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Watch for Seasonal Sales</p>
                <p>End of season clearances often have the best deals on shoes.</p>
              </div>
              <div>
                <p className="font-medium mb-1">Check Back Regularly</p>
                <p>Prices change frequently. Items in your saved list help you spot great deals.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
