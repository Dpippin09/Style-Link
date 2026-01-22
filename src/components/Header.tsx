'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { User, ShoppingBag, Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            
            {/* Shopping Bag - Saved Items */}
            <Link href="/saved" className="p-2 text-gray-400 hover:text-white transition-colors">
              <ShoppingBag className="h-5 w-5" />
            </Link>

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
                <Link href="/price-alerts" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Price Alerts
                </Link>
                <Link href="/deals" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Top Deals
                </Link>
                <Link href="/contact" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Contact Us
                </Link>
                <Link href="/profile" className="block px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-md font-medium transition-colors">
                  Profile
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
