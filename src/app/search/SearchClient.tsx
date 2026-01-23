'use client'

import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchResults from '@/components/SearchResults'
import { ArrowLeft, Search } from 'lucide-react'

const SearchClient = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams?.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Back button and Search bar */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for shoes..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Results header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-black mb-1">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for &quot;{query}&quot;
            </p>
          )}
        </div>
        
        <SearchResults query={query} />
      </main>
      <Footer />
    </div>
  )
}

export default SearchClient
