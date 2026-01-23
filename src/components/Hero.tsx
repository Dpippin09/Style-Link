'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const popularSearches = [
    'Nike sneakers',
    'Dress shoes',
    'Running shoes',
    'Boots',
    'Sandals',
    'Athletic shoes'
  ]

  return (
    <div className="bg-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight font-sans tracking-wide">
                STYL<span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>E</span>LINK
              </h1>
              <p className="text-xl text-stone-700 max-w-md">
                Find the best prices on shoes across all retailers.
              </p>
              <p className="text-lg font-semibold text-stone-900">
                Compare • Save • Shop Smart
              </p>
            </div>

            {/* Search Bar */}
            <div className="space-y-4">
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                const query = formData.get('search') as string
                if (query?.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(query.trim())}`
                }
              }} className="w-full max-w-lg">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search for shoes..."
                    className="w-full pl-6 pr-14 py-4 text-lg border border-stone-400 rounded-full focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-transparent shadow-lg bg-stone-300 text-stone-900 placeholder-stone-600"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 bg-stone-800 text-white rounded-full hover:bg-stone-900 transition-colors shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-xl">
              {/* Placeholder for hero image - you can replace this with an actual shoe image */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200 flex items-center justify-center">
                <div className="text-stone-800 text-center">
                  <div className="text-6xl mb-4">👟</div>
                  <p className="text-lg font-semibold text-stone-700">Premium Shoe Collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
