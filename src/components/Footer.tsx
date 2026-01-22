import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold font-sans tracking-wide">
              STYL<span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>E</span>LINK
            </h3>
            <p className="text-gray-300 text-sm">
              Your shoe marketplace for discovering the best deals from top retailers worldwide. 
              Find exactly what you&apos;re looking for at the price you want.
            </p>
            <div className="space-y-1 text-sm text-gray-300">
              <p>+1 (555) 123-4567</p>
              <p>hello@stylelink.com</p>
              <p>123 Fashion Avenue</p>
              <p>New York, NY 10001</p>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <nav className="space-y-2">
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                About StyleLink
              </Link>
              <Link href="/careers" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Careers
              </Link>
              <Link href="/press" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Press
              </Link>
              <Link href="/blog" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Blog
              </Link>
            </nav>
          </div>

          {/* Customer Care Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Customer Care</h4>
            <nav className="space-y-2">
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/size-guide" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Size Guide
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Shipping & Returns
              </Link>
              <Link href="/track-order" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Track Your Order
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Legal</h4>
            <nav className="space-y-2">
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Accessibility
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-gray-300 text-sm">
              © 2026 StyleLink. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-1">
              <span className="text-gray-300 text-sm mr-4">Follow us:</span>
              <Link
                href="https://facebook.com/stylelink"
                className="p-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com/stylelink"
                className="p-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com/stylelink"
                className="p-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com/stylelink"
                className="p-2 text-gray-300 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
