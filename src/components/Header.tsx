'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Download } from 'lucide-react'

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Save the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      // Hide the install button after installation
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Show instructions if the install prompt isn't available
      alert('To install StyleLink:\n\n• On iPhone: Tap the Share button, then "Add to Home Screen"\n• On Android: Tap the menu (⋮) and select "Install app"\n• On Desktop: Look for the install icon in your browser\'s address bar\n\nNote: Run "npm run build && npm start" for full PWA support.')
      return
    }

    // Show the install prompt
    await deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      setIsInstallable(false)
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
  }

  return (
    <header className="bg-black shadow-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Install Button */}
          <div className="flex-1">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-2 px-3 py-1.5 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install App</span>
            </button>
          </div>

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
