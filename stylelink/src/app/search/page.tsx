'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SearchResults from '@/components/SearchResults'

const SearchPage = () => {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
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

export default SearchPage
