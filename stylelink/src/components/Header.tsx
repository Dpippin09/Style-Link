'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-black shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side spacer for centering */}
          <div className="flex-1"></div>

          {/* Logo - Centered */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white flex items-center font-sans tracking-wide">
              <span>STYL</span>
              <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>E</span>
              <span className="text-white">LINK</span>
            </Link>
          </div>

          {/* Right side - User Actions */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {/* User Account */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
            
            {/* Shopping Bag */}
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </button>

            {/* Hamburger Menu Button - Always Visible */}
            <button
              className="p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu - Shows on all screen sizes */}
      {isMenuOpen && (
        <div className="bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links */}
            <nav className="space-y-1">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white px-3 py-2">Categories</p>
                <Link href="/sneakers" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Sneakers
                </Link>
                <Link href="/dress-shoes" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Dress Shoes
                </Link>
                <Link href="/boots" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Boots
                </Link>
                <Link href="/sandals" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Sandals
                </Link>
                <Link href="/athletic" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Athletic
                </Link>
                <Link href="/casual" className="block px-6 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Casual
                </Link>
              </div>
              
              <div className="border-t border-gray-800 pt-4 space-y-1">
                <Link href="/brands" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Brands
                </Link>
                <Link href="/deals" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Deals
                </Link>
                <Link href="/about" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  About
                </Link>
                <Link href="/contact" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Contact
                </Link>
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-1">
                <Link href="/account" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  My Account
                </Link>
                <Link href="/wishlist" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Wishlist
                </Link>
                <Link href="/help" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md transition-colors">
                  Help Center
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
