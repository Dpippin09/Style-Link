import React from 'react'
import Link from 'next/link'
import { Heart, RefreshCw } from 'lucide-react'

export default function Offline() {
  return (
    <div className="min-h-screen bg-stone-200 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black font-sans tracking-wide">
            <span>STYL</span>
            <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>E</span>
            <span>LINK</span>
          </h1>
        </div>

        {/* Offline Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-stone-300 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728M12 2.5a9.5 9.5 0 100 19 9.5 9.5 0 000-19z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-black mb-4">You&apos;re Offline</h2>
        
        {/* Description */}
        <p className="text-stone-700 mb-8 leading-relaxed">
          It looks like you&apos;ve lost your internet connection. Don&apos;t worry, you can still browse your saved items and previous searches while offline.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          
          <Link 
            href="/saved" 
            className="w-full bg-stone-300 text-black py-3 px-6 rounded-md font-medium hover:bg-stone-400 transition-colors flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4" />
            <span>View Saved Items</span>
          </Link>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-stone-100 rounded-md">
          <h3 className="font-medium text-black mb-2">Offline Tips:</h3>
          <ul className="text-sm text-stone-600 space-y-1 text-left">
            <li>• Check your Wi-Fi or mobile data connection</li>
            <li>• Your saved items are still available</li>
            <li>• Previous searches are cached</li>
            <li>• The app will sync when you&apos;re back online</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
