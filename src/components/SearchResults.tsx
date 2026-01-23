'use client'

import React, { useState, useEffect } from 'react'
import { ExternalLink, Heart, Filter, Grid, List } from 'lucide-react'

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
  category: string
  sizes: string[]
}

interface SearchResultsProps {
  query: string
}

// Mock search data - replace with real API integration
const mockSearchResults: ShoeProduct[] = [
  // Nike Shoes
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
    reviews: 1234,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '2',
    name: 'Air Force 1 Low',
    brand: 'Nike',
    price: 110,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-2.jpg',
    affiliateLink: 'https://nike.com/air-force-1',
    rating: 4.8,
    reviews: 3421,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '3',
    name: 'Dunk Low',
    brand: 'Nike',
    price: 115,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-3.jpg',
    affiliateLink: 'https://nike.com/dunk-low',
    rating: 4.7,
    reviews: 3198,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '4',
    name: 'Dunk High',
    brand: 'Nike',
    price: 125,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-4.jpg',
    affiliateLink: 'https://nike.com/dunk-high',
    rating: 4.6,
    reviews: 1876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '5',
    name: 'Air Max 90',
    brand: 'Nike',
    price: 130,
    originalPrice: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-5.jpg',
    affiliateLink: 'https://nike.com/air-max-90',
    rating: 4.7,
    reviews: 2543,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '6',
    name: 'Air Max 97',
    brand: 'Nike',
    price: 175,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-6.jpg',
    affiliateLink: 'https://nike.com/air-max-97',
    rating: 4.5,
    reviews: 1987,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '7',
    name: 'Air Max 95',
    brand: 'Nike',
    price: 185,
    originalPrice: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-7.jpg',
    affiliateLink: 'https://nike.com/air-max-95',
    rating: 4.6,
    reviews: 1654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '8',
    name: 'Air Max 1',
    brand: 'Nike',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-8.jpg',
    affiliateLink: 'https://nike.com/air-max-1',
    rating: 4.7,
    reviews: 2234,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '9',
    name: 'Air VaporMax Plus',
    brand: 'Nike',
    price: 210,
    originalPrice: 250,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-9.jpg',
    affiliateLink: 'https://nike.com/vapormax-plus',
    rating: 4.4,
    reviews: 1123,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '10',
    name: 'Air VaporMax Flyknit',
    brand: 'Nike',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-10.jpg',
    affiliateLink: 'https://nike.com/vapormax-flyknit',
    rating: 4.5,
    reviews: 987,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '11',
    name: 'React Infinity Run',
    brand: 'Nike',
    price: 160,
    originalPrice: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-11.jpg',
    affiliateLink: 'https://nike.com/react-infinity',
    rating: 4.6,
    reviews: 1432,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '12',
    name: 'ZoomX Invincible Run',
    brand: 'Nike',
    price: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-12.jpg',
    affiliateLink: 'https://nike.com/invincible-run',
    rating: 4.7,
    reviews: 876,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '13',
    name: 'Pegasus 40',
    brand: 'Nike',
    price: 130,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-13.jpg',
    affiliateLink: 'https://nike.com/pegasus-40',
    rating: 4.8,
    reviews: 3654,
    category: 'Running',
    sizes: ['7', '8', '9', '10', '11', '12', '13']
  },
  {
    id: '14',
    name: 'Vomero 17',
    brand: 'Nike',
    price: 160,
    originalPrice: 175,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-14.jpg',
    affiliateLink: 'https://nike.com/vomero-17',
    rating: 4.5,
    reviews: 765,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '15',
    name: 'Free Run 5.0',
    brand: 'Nike',
    price: 110,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-15.jpg',
    affiliateLink: 'https://nike.com/free-run',
    rating: 4.4,
    reviews: 1234,
    category: 'Running',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '16',
    name: 'Blazer Mid 77',
    brand: 'Nike',
    price: 105,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-16.jpg',
    affiliateLink: 'https://nike.com/blazer-mid-77',
    rating: 4.6,
    reviews: 2876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '17',
    name: 'Blazer Low',
    brand: 'Nike',
    price: 95,
    originalPrice: 110,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-17.jpg',
    affiliateLink: 'https://nike.com/blazer-low',
    rating: 4.5,
    reviews: 1543,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '18',
    name: 'Cortez',
    brand: 'Nike',
    price: 90,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-18.jpg',
    affiliateLink: 'https://nike.com/cortez',
    rating: 4.4,
    reviews: 1876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '19',
    name: 'Waffle One',
    brand: 'Nike',
    price: 100,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-19.jpg',
    affiliateLink: 'https://nike.com/waffle-one',
    rating: 4.3,
    reviews: 987,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '20',
    name: 'Air Huarache',
    brand: 'Nike',
    price: 130,
    originalPrice: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-20.jpg',
    affiliateLink: 'https://nike.com/air-huarache',
    rating: 4.5,
    reviews: 2134,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '21',
    name: 'Air Presto',
    brand: 'Nike',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-21.jpg',
    affiliateLink: 'https://nike.com/air-presto',
    rating: 4.6,
    reviews: 1765,
    category: 'Casual',
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '22',
    name: 'Air Rift',
    brand: 'Nike',
    price: 120,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-22.jpg',
    affiliateLink: 'https://nike.com/air-rift',
    rating: 4.2,
    reviews: 654,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: '23',
    name: 'Shox TL',
    brand: 'Nike',
    price: 170,
    originalPrice: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-23.jpg',
    affiliateLink: 'https://nike.com/shox-tl',
    rating: 4.4,
    reviews: 876,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '24',
    name: 'Tech Hera',
    brand: 'Nike',
    price: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-24.jpg',
    affiliateLink: 'https://nike.com/tech-hera',
    rating: 4.3,
    reviews: 543,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '25',
    name: 'P-6000',
    brand: 'Nike',
    price: 110,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-25.jpg',
    affiliateLink: 'https://nike.com/p-6000',
    rating: 4.4,
    reviews: 765,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '26',
    name: 'V2K Run',
    brand: 'Nike',
    price: 120,
    originalPrice: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-26.jpg',
    affiliateLink: 'https://nike.com/v2k-run',
    rating: 4.5,
    reviews: 876,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '27',
    name: 'Zoom Vomero 5',
    brand: 'Nike',
    price: 160,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-27.jpg',
    affiliateLink: 'https://nike.com/zoom-vomero-5',
    rating: 4.6,
    reviews: 1234,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '28',
    name: 'LeBron 21',
    brand: 'Nike',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-28.jpg',
    affiliateLink: 'https://nike.com/lebron-21',
    rating: 4.7,
    reviews: 1543,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13', '14']
  },
  {
    id: '29',
    name: 'KD 16',
    brand: 'Nike',
    price: 160,
    originalPrice: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-29.jpg',
    affiliateLink: 'https://nike.com/kd-16',
    rating: 4.6,
    reviews: 987,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '30',
    name: 'Giannis Immortality 3',
    brand: 'Nike',
    price: 120,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-30.jpg',
    affiliateLink: 'https://nike.com/giannis-immortality',
    rating: 4.5,
    reviews: 765,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '31',
    name: 'Kobe 6 Protro',
    brand: 'Nike',
    price: 190,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-31.jpg',
    affiliateLink: 'https://nike.com/kobe-6-protro',
    rating: 4.9,
    reviews: 2345,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '32',
    name: 'Ja 1',
    brand: 'Nike',
    price: 130,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-32.jpg',
    affiliateLink: 'https://nike.com/ja-1',
    rating: 4.6,
    reviews: 1234,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '33',
    name: 'GT Cut 3',
    brand: 'Nike',
    price: 180,
    originalPrice: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-33.jpg',
    affiliateLink: 'https://nike.com/gt-cut-3',
    rating: 4.7,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '34',
    name: 'Sabrina 1',
    brand: 'Nike',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-34.jpg',
    affiliateLink: 'https://nike.com/sabrina-1',
    rating: 4.5,
    reviews: 654,
    category: 'Basketball',
    sizes: ['6', '7', '8', '9', '10', '11', '12']
  },
  {
    id: '35',
    name: 'Air Zoom GT Hustle 2',
    brand: 'Nike',
    price: 170,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-35.jpg',
    affiliateLink: 'https://nike.com/gt-hustle-2',
    rating: 4.6,
    reviews: 543,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '36',
    name: 'Book 1',
    brand: 'Nike',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-36.jpg',
    affiliateLink: 'https://nike.com/book-1',
    rating: 4.5,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '37',
    name: 'SB Dunk Low Pro',
    brand: 'Nike',
    price: 115,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-37.jpg',
    affiliateLink: 'https://nike.com/sb-dunk-low-pro',
    rating: 4.8,
    reviews: 2987,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '38',
    name: 'SB Dunk High Pro',
    brand: 'Nike',
    price: 125,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-38.jpg',
    affiliateLink: 'https://nike.com/sb-dunk-high-pro',
    rating: 4.7,
    reviews: 1654,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '39',
    name: 'SB Blazer Mid',
    brand: 'Nike',
    price: 100,
    originalPrice: 115,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-39.jpg',
    affiliateLink: 'https://nike.com/sb-blazer-mid',
    rating: 4.6,
    reviews: 1234,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '40',
    name: 'SB Janoski',
    brand: 'Nike',
    price: 85,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-40.jpg',
    affiliateLink: 'https://nike.com/sb-janoski',
    rating: 4.5,
    reviews: 2134,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '41',
    name: 'Metcon 9',
    brand: 'Nike',
    price: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-41.jpg',
    affiliateLink: 'https://nike.com/metcon-9',
    rating: 4.7,
    reviews: 1876,
    category: 'Training',
    sizes: ['7', '8', '9', '10', '11', '12', '13']
  },
  {
    id: '42',
    name: 'Free Metcon 5',
    brand: 'Nike',
    price: 120,
    originalPrice: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-42.jpg',
    affiliateLink: 'https://nike.com/free-metcon-5',
    rating: 4.6,
    reviews: 1234,
    category: 'Training',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '43',
    name: 'SuperRep Go 3',
    brand: 'Nike',
    price: 100,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-43.jpg',
    affiliateLink: 'https://nike.com/superrep-go-3',
    rating: 4.4,
    reviews: 765,
    category: 'Training',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '44',
    name: 'Air Zoom TR 1',
    brand: 'Nike',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-44.jpg',
    affiliateLink: 'https://nike.com/air-zoom-tr-1',
    rating: 4.5,
    reviews: 654,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '45',
    name: 'Romaleos 4',
    brand: 'Nike',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-45.jpg',
    affiliateLink: 'https://nike.com/romaleos-4',
    rating: 4.8,
    reviews: 543,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  // Adidas Shoes
  {
    id: '46',
    name: 'Ultra Boost 22',
    brand: 'Adidas',
    price: 180,
    originalPrice: 220,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-46.jpg',
    affiliateLink: 'https://adidas.com/ultra-boost-22',
    rating: 4.7,
    reviews: 987,
    category: 'Running',
    sizes: ['8', '9', '10', '11']
  },
  {
    id: '47',
    name: 'Ultra Boost Light',
    brand: 'Adidas',
    price: 190,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-47.jpg',
    affiliateLink: 'https://adidas.com/ultra-boost-light',
    rating: 4.8,
    reviews: 1234,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '48',
    name: 'Superstar',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-48.jpg',
    affiliateLink: 'https://adidas.com/superstar',
    rating: 4.6,
    reviews: 2156,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '100',
    name: 'Stan Smith',
    brand: 'Adidas',
    price: 95,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-100.jpg',
    affiliateLink: 'https://adidas.com/stan-smith',
    rating: 4.7,
    reviews: 3876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '101',
    name: 'Stan Smith Lux',
    brand: 'Adidas',
    price: 150,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-101.jpg',
    affiliateLink: 'https://adidas.com/stan-smith-lux',
    rating: 4.6,
    reviews: 765,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '102',
    name: 'NMD_R1',
    brand: 'Adidas',
    price: 150,
    originalPrice: 170,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-102.jpg',
    affiliateLink: 'https://adidas.com/nmd-r1',
    rating: 4.5,
    reviews: 1543,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: '103',
    name: 'NMD_S1',
    brand: 'Adidas',
    price: 180,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-103.jpg',
    affiliateLink: 'https://adidas.com/nmd-s1',
    rating: 4.5,
    reviews: 654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '104',
    name: 'NMD_V3',
    brand: 'Adidas',
    price: 160,
    originalPrice: 180,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-104.jpg',
    affiliateLink: 'https://adidas.com/nmd-v3',
    rating: 4.4,
    reviews: 876,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '105',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-105.jpg',
    affiliateLink: 'https://adidas.com/samba-og',
    rating: 4.9,
    reviews: 5432,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '106',
    name: 'Samba Classic',
    brand: 'Adidas',
    price: 80,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-106.jpg',
    affiliateLink: 'https://adidas.com/samba-classic',
    rating: 4.7,
    reviews: 2345,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '107',
    name: 'Gazelle',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-107.jpg',
    affiliateLink: 'https://adidas.com/gazelle',
    rating: 4.7,
    reviews: 3234,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '108',
    name: 'Gazelle Bold',
    brand: 'Adidas',
    price: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-108.jpg',
    affiliateLink: 'https://adidas.com/gazelle-bold',
    rating: 4.6,
    reviews: 1876,
    category: 'Casual',
    sizes: ['6', '7', '8', '9', '10', '11']
  },
  {
    id: '109',
    name: 'Campus 00s',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-109.jpg',
    affiliateLink: 'https://adidas.com/campus-00s',
    rating: 4.7,
    reviews: 2654,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '110',
    name: 'Forum Low',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-110.jpg',
    affiliateLink: 'https://adidas.com/forum-low',
    rating: 4.6,
    reviews: 1987,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '111',
    name: 'Forum Mid',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-111.jpg',
    affiliateLink: 'https://adidas.com/forum-mid',
    rating: 4.5,
    reviews: 1234,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '112',
    name: 'Forum 84 High',
    brand: 'Adidas',
    price: 130,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-112.jpg',
    affiliateLink: 'https://adidas.com/forum-84-high',
    rating: 4.5,
    reviews: 876,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '113',
    name: 'Rivalry Low',
    brand: 'Adidas',
    price: 90,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-113.jpg',
    affiliateLink: 'https://adidas.com/rivalry-low',
    rating: 4.4,
    reviews: 765,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '114',
    name: 'Ozweego',
    brand: 'Adidas',
    price: 120,
    originalPrice: 140,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-114.jpg',
    affiliateLink: 'https://adidas.com/ozweego',
    rating: 4.4,
    reviews: 1543,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '115',
    name: 'Ozelia',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-115.jpg',
    affiliateLink: 'https://adidas.com/ozelia',
    rating: 4.3,
    reviews: 876,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '116',
    name: 'Retropy E5',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-116.jpg',
    affiliateLink: 'https://adidas.com/retropy-e5',
    rating: 4.4,
    reviews: 654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '117',
    name: 'ZX 1K Boost 2.0',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-117.jpg',
    affiliateLink: 'https://adidas.com/zx-1k-boost',
    rating: 4.5,
    reviews: 987,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '118',
    name: 'ZX 22 Boost',
    brand: 'Adidas',
    price: 150,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-118.jpg',
    affiliateLink: 'https://adidas.com/zx-22-boost',
    rating: 4.5,
    reviews: 765,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '119',
    name: 'Yeezy Boost 350 V2',
    brand: 'Adidas',
    price: 230,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-119.jpg',
    affiliateLink: 'https://adidas.com/yeezy-350-v2',
    rating: 4.8,
    reviews: 4567,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '120',
    name: 'Yeezy Boost 700',
    brand: 'Adidas',
    price: 300,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-120.jpg',
    affiliateLink: 'https://adidas.com/yeezy-700',
    rating: 4.6,
    reviews: 2345,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '121',
    name: 'Yeezy Slide',
    brand: 'Adidas',
    price: 70,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-121.jpg',
    affiliateLink: 'https://adidas.com/yeezy-slide',
    rating: 4.5,
    reviews: 3456,
    category: 'Slides',
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13']
  },
  {
    id: '122',
    name: 'Adilette 22',
    brand: 'Adidas',
    price: 55,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-122.jpg',
    affiliateLink: 'https://adidas.com/adilette-22',
    rating: 4.4,
    reviews: 1234,
    category: 'Slides',
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13']
  },
  {
    id: '123',
    name: 'Adilette Comfort',
    brand: 'Adidas',
    price: 35,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-123.jpg',
    affiliateLink: 'https://adidas.com/adilette-comfort',
    rating: 4.6,
    reviews: 2876,
    category: 'Slides',
    sizes: ['6', '7', '8', '9', '10', '11', '12', '13']
  },
  {
    id: '124',
    name: 'Adizero Adios Pro 3',
    brand: 'Adidas',
    price: 250,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-124.jpg',
    affiliateLink: 'https://adidas.com/adizero-adios-pro-3',
    rating: 4.9,
    reviews: 876,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '125',
    name: 'Adizero Boston 12',
    brand: 'Adidas',
    price: 160,
    originalPrice: 180,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-125.jpg',
    affiliateLink: 'https://adidas.com/adizero-boston-12',
    rating: 4.7,
    reviews: 1234,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '126',
    name: 'Adizero SL',
    brand: 'Adidas',
    price: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-126.jpg',
    affiliateLink: 'https://adidas.com/adizero-sl',
    rating: 4.6,
    reviews: 987,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '127',
    name: 'Supernova Rise',
    brand: 'Adidas',
    price: 140,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-127.jpg',
    affiliateLink: 'https://adidas.com/supernova-rise',
    rating: 4.6,
    reviews: 1543,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '128',
    name: 'Supernova 3',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-128.jpg',
    affiliateLink: 'https://adidas.com/supernova-3',
    rating: 4.5,
    reviews: 1234,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '129',
    name: 'Solarglide 6',
    brand: 'Adidas',
    price: 140,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-129.jpg',
    affiliateLink: 'https://adidas.com/solarglide-6',
    rating: 4.5,
    reviews: 765,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '130',
    name: 'Runfalcon 3.0',
    brand: 'Adidas',
    price: 65,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-130.jpg',
    affiliateLink: 'https://adidas.com/runfalcon-3',
    rating: 4.3,
    reviews: 2345,
    category: 'Running',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '131',
    name: 'Duramo Speed',
    brand: 'Adidas',
    price: 80,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-131.jpg',
    affiliateLink: 'https://adidas.com/duramo-speed',
    rating: 4.4,
    reviews: 1876,
    category: 'Running',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '132',
    name: 'Response Super 3.0',
    brand: 'Adidas',
    price: 85,
    originalPrice: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-132.jpg',
    affiliateLink: 'https://adidas.com/response-super-3',
    rating: 4.4,
    reviews: 1543,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '133',
    name: 'Pureboost 23',
    brand: 'Adidas',
    price: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-133.jpg',
    affiliateLink: 'https://adidas.com/pureboost-23',
    rating: 4.5,
    reviews: 876,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '134',
    name: 'Anthony Edwards 1',
    brand: 'Adidas',
    price: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-134.jpg',
    affiliateLink: 'https://adidas.com/ae-1',
    rating: 4.7,
    reviews: 1654,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '135',
    name: 'Harden Vol. 7',
    brand: 'Adidas',
    price: 160,
    originalPrice: 180,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-135.jpg',
    affiliateLink: 'https://adidas.com/harden-vol-7',
    rating: 4.6,
    reviews: 1234,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '136',
    name: 'Dame 8',
    brand: 'Adidas',
    price: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-136.jpg',
    affiliateLink: 'https://adidas.com/dame-8',
    rating: 4.6,
    reviews: 1543,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '137',
    name: 'Trae Young 3',
    brand: 'Adidas',
    price: 130,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-137.jpg',
    affiliateLink: 'https://adidas.com/trae-young-3',
    rating: 4.5,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '138',
    name: 'D.O.N. Issue 5',
    brand: 'Adidas',
    price: 110,
    originalPrice: 130,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-138.jpg',
    affiliateLink: 'https://adidas.com/don-issue-5',
    rating: 4.5,
    reviews: 987,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '139',
    name: 'Exhibit A',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-139.jpg',
    affiliateLink: 'https://adidas.com/exhibit-a',
    rating: 4.4,
    reviews: 765,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '140',
    name: 'Adizero Select',
    brand: 'Adidas',
    price: 90,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-140.jpg',
    affiliateLink: 'https://adidas.com/adizero-select',
    rating: 4.4,
    reviews: 654,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '141',
    name: 'Dropset 2 Trainer',
    brand: 'Adidas',
    price: 130,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-141.jpg',
    affiliateLink: 'https://adidas.com/dropset-2',
    rating: 4.6,
    reviews: 876,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '142',
    name: 'Dropset 3 Trainer',
    brand: 'Adidas',
    price: 140,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-142.jpg',
    affiliateLink: 'https://adidas.com/dropset-3',
    rating: 4.7,
    reviews: 654,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '143',
    name: 'Adipower Weightlifting 3',
    brand: 'Adidas',
    price: 200,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-143.jpg',
    affiliateLink: 'https://adidas.com/adipower-3',
    rating: 4.8,
    reviews: 543,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '144',
    name: 'Powerlift 5',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-144.jpg',
    affiliateLink: 'https://adidas.com/powerlift-5',
    rating: 4.6,
    reviews: 765,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '145',
    name: 'Trainer V',
    brand: 'Adidas',
    price: 80,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-145.jpg',
    affiliateLink: 'https://adidas.com/trainer-v',
    rating: 4.4,
    reviews: 987,
    category: 'Training',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '146',
    name: 'Copa Pure 2 Elite FG',
    brand: 'Adidas',
    price: 300,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-146.jpg',
    affiliateLink: 'https://adidas.com/copa-pure-2-elite',
    rating: 4.8,
    reviews: 654,
    category: 'Soccer',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '147',
    name: 'Predator Elite FG',
    brand: 'Adidas',
    price: 300,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-147.jpg',
    affiliateLink: 'https://adidas.com/predator-elite',
    rating: 4.8,
    reviews: 876,
    category: 'Soccer',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '148',
    name: 'X Crazyfast Elite FG',
    brand: 'Adidas',
    price: 280,
    originalPrice: 300,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-148.jpg',
    affiliateLink: 'https://adidas.com/x-crazyfast-elite',
    rating: 4.7,
    reviews: 765,
    category: 'Soccer',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '149',
    name: 'F50 Elite FG',
    brand: 'Adidas',
    price: 275,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-149.jpg',
    affiliateLink: 'https://adidas.com/f50-elite',
    rating: 4.7,
    reviews: 543,
    category: 'Soccer',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '150',
    name: 'Predator Accuracy.3 TF',
    brand: 'Adidas',
    price: 90,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-150.jpg',
    affiliateLink: 'https://adidas.com/predator-accuracy-3-tf',
    rating: 4.5,
    reviews: 1234,
    category: 'Soccer',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '151',
    name: 'Busenitz Vulc II',
    brand: 'Adidas',
    price: 80,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-151.jpg',
    affiliateLink: 'https://adidas.com/busenitz-vulc-2',
    rating: 4.7,
    reviews: 1876,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '152',
    name: 'Tyshawn',
    brand: 'Adidas',
    price: 90,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-152.jpg',
    affiliateLink: 'https://adidas.com/tyshawn',
    rating: 4.7,
    reviews: 1543,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '153',
    name: 'Forum 84 ADV',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-153.jpg',
    affiliateLink: 'https://adidas.com/forum-84-adv',
    rating: 4.6,
    reviews: 987,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '154',
    name: 'Aloha Super',
    brand: 'Adidas',
    price: 85,
    originalPrice: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-154.jpg',
    affiliateLink: 'https://adidas.com/aloha-super',
    rating: 4.5,
    reviews: 654,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '155',
    name: 'Puig',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-155.jpg',
    affiliateLink: 'https://adidas.com/puig',
    rating: 4.6,
    reviews: 765,
    category: 'Skateboarding',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '156',
    name: 'Terrex Free Hiker 2',
    brand: 'Adidas',
    price: 230,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-156.jpg',
    affiliateLink: 'https://adidas.com/terrex-free-hiker-2',
    rating: 4.7,
    reviews: 876,
    category: 'Outdoor',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '157',
    name: 'Terrex AX4',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-157.jpg',
    affiliateLink: 'https://adidas.com/terrex-ax4',
    rating: 4.5,
    reviews: 1234,
    category: 'Outdoor',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '158',
    name: 'Terrex Swift R3 GTX',
    brand: 'Adidas',
    price: 180,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-158.jpg',
    affiliateLink: 'https://adidas.com/terrex-swift-r3-gtx',
    rating: 4.6,
    reviews: 765,
    category: 'Outdoor',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '159',
    name: 'Terrex Trailmaker 2',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-159.jpg',
    affiliateLink: 'https://adidas.com/terrex-trailmaker-2',
    rating: 4.5,
    reviews: 543,
    category: 'Outdoor',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '160',
    name: 'Spezial',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-160.jpg',
    affiliateLink: 'https://adidas.com/spezial',
    rating: 4.8,
    reviews: 2345,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '161',
    name: 'SL 72',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-161.jpg',
    affiliateLink: 'https://adidas.com/sl-72',
    rating: 4.5,
    reviews: 876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '162',
    name: 'Country OG',
    brand: 'Adidas',
    price: 100,
    originalPrice: 120,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-162.jpg',
    affiliateLink: 'https://adidas.com/country-og',
    rating: 4.5,
    reviews: 654,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '163',
    name: 'Handball Spezial',
    brand: 'Adidas',
    price: 110,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-163.jpg',
    affiliateLink: 'https://adidas.com/handball-spezial',
    rating: 4.8,
    reviews: 3456,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  // Jordan Shoes
  {
    id: '49',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    price: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-49.jpg',
    affiliateLink: 'https://nike.com/jordan-1-retro-high',
    rating: 4.9,
    reviews: 4532,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '50',
    name: 'Air Jordan 1 Low',
    brand: 'Jordan',
    price: 115,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-50.jpg',
    affiliateLink: 'https://nike.com/jordan-1-low',
    rating: 4.7,
    reviews: 3876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '51',
    name: 'Air Jordan 1 Mid',
    brand: 'Jordan',
    price: 135,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-51.jpg',
    affiliateLink: 'https://nike.com/jordan-1-mid',
    rating: 4.6,
    reviews: 2987,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '52',
    name: 'Air Jordan 2 Retro',
    brand: 'Jordan',
    price: 175,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-52.jpg',
    affiliateLink: 'https://nike.com/jordan-2-retro',
    rating: 4.4,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '53',
    name: 'Air Jordan 3 Retro',
    brand: 'Jordan',
    price: 200,
    originalPrice: 220,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-53.jpg',
    affiliateLink: 'https://nike.com/jordan-3-retro',
    rating: 4.8,
    reviews: 3654,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '54',
    name: 'Air Jordan 4 Retro',
    brand: 'Jordan',
    price: 210,
    originalPrice: 225,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-54.jpg',
    affiliateLink: 'https://nike.com/jordan-4-retro',
    rating: 4.8,
    reviews: 2876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '55',
    name: 'Air Jordan 5 Retro',
    brand: 'Jordan',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-55.jpg',
    affiliateLink: 'https://nike.com/jordan-5-retro',
    rating: 4.7,
    reviews: 2345,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '56',
    name: 'Air Jordan 6 Retro',
    brand: 'Jordan',
    price: 200,
    originalPrice: 220,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-56.jpg',
    affiliateLink: 'https://nike.com/jordan-6-retro',
    rating: 4.8,
    reviews: 2567,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '57',
    name: 'Air Jordan 7 Retro',
    brand: 'Jordan',
    price: 190,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-57.jpg',
    affiliateLink: 'https://nike.com/jordan-7-retro',
    rating: 4.6,
    reviews: 1234,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '58',
    name: 'Air Jordan 8 Retro',
    brand: 'Jordan',
    price: 190,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-58.jpg',
    affiliateLink: 'https://nike.com/jordan-8-retro',
    rating: 4.5,
    reviews: 987,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '59',
    name: 'Air Jordan 9 Retro',
    brand: 'Jordan',
    price: 190,
    originalPrice: 210,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-59.jpg',
    affiliateLink: 'https://nike.com/jordan-9-retro',
    rating: 4.5,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '60',
    name: 'Air Jordan 10 Retro',
    brand: 'Jordan',
    price: 190,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-60.jpg',
    affiliateLink: 'https://nike.com/jordan-10-retro',
    rating: 4.5,
    reviews: 765,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '61',
    name: 'Air Jordan 11 Retro',
    brand: 'Jordan',
    price: 225,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-61.jpg',
    affiliateLink: 'https://nike.com/jordan-11-retro',
    rating: 4.9,
    reviews: 5432,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '62',
    name: 'Air Jordan 11 Low',
    brand: 'Jordan',
    price: 185,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-62.jpg',
    affiliateLink: 'https://nike.com/jordan-11-low',
    rating: 4.7,
    reviews: 2345,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '63',
    name: 'Air Jordan 12 Retro',
    brand: 'Jordan',
    price: 200,
    originalPrice: 220,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-63.jpg',
    affiliateLink: 'https://nike.com/jordan-12-retro',
    rating: 4.7,
    reviews: 2876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '64',
    name: 'Air Jordan 13 Retro',
    brand: 'Jordan',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-64.jpg',
    affiliateLink: 'https://nike.com/jordan-13-retro',
    rating: 4.7,
    reviews: 2543,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '65',
    name: 'Air Jordan 14 Retro',
    brand: 'Jordan',
    price: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-65.jpg',
    affiliateLink: 'https://nike.com/jordan-14-retro',
    rating: 4.5,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '66',
    name: 'Air Jordan 36',
    brand: 'Jordan',
    price: 185,
    originalPrice: 200,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-66.jpg',
    affiliateLink: 'https://nike.com/jordan-36',
    rating: 4.6,
    reviews: 1234,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '67',
    name: 'Air Jordan 37',
    brand: 'Jordan',
    price: 185,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-67.jpg',
    affiliateLink: 'https://nike.com/jordan-37',
    rating: 4.6,
    reviews: 987,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '68',
    name: 'Air Jordan 38',
    brand: 'Jordan',
    price: 185,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-68.jpg',
    affiliateLink: 'https://nike.com/jordan-38',
    rating: 4.7,
    reviews: 765,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '69',
    name: 'Jordan Max Aura 4',
    brand: 'Jordan',
    price: 130,
    originalPrice: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-69.jpg',
    affiliateLink: 'https://nike.com/jordan-max-aura-4',
    rating: 4.4,
    reviews: 1543,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '70',
    name: 'Jordan Stay Loyal 3',
    brand: 'Jordan',
    price: 110,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-70.jpg',
    affiliateLink: 'https://nike.com/jordan-stay-loyal-3',
    rating: 4.3,
    reviews: 876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '71',
    name: 'Jordan Delta 3 Low',
    brand: 'Jordan',
    price: 130,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-71.jpg',
    affiliateLink: 'https://nike.com/jordan-delta-3-low',
    rating: 4.4,
    reviews: 654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '72',
    name: 'Jordan Nu Retro 1 Low',
    brand: 'Jordan',
    price: 100,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-72.jpg',
    affiliateLink: 'https://nike.com/jordan-nu-retro-1-low',
    rating: 4.5,
    reviews: 765,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '73',
    name: 'Jordan Spizike Low',
    brand: 'Jordan',
    price: 160,
    originalPrice: 180,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-73.jpg',
    affiliateLink: 'https://nike.com/jordan-spizike-low',
    rating: 4.6,
    reviews: 1234,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '74',
    name: 'Jordan Luka 2',
    brand: 'Jordan',
    price: 130,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-74.jpg',
    affiliateLink: 'https://nike.com/jordan-luka-2',
    rating: 4.7,
    reviews: 1876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '75',
    name: 'Jordan Tatum 2',
    brand: 'Jordan',
    price: 125,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-75.jpg',
    affiliateLink: 'https://nike.com/jordan-tatum-2',
    rating: 4.6,
    reviews: 1543,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '76',
    name: 'Jordan Zion 3',
    brand: 'Jordan',
    price: 140,
    originalPrice: 160,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-76.jpg',
    affiliateLink: 'https://nike.com/jordan-zion-3',
    rating: 4.5,
    reviews: 987,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13', '14']
  },
  {
    id: '77',
    name: 'Jordan Why Not .6',
    brand: 'Jordan',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-77.jpg',
    affiliateLink: 'https://nike.com/jordan-why-not-6',
    rating: 4.5,
    reviews: 876,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '78',
    name: 'Jordan One Take 4',
    brand: 'Jordan',
    price: 100,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-78.jpg',
    affiliateLink: 'https://nike.com/jordan-one-take-4',
    rating: 4.4,
    reviews: 1234,
    category: 'Basketball',
    sizes: ['8', '9', '10', '11', '12', '13']
  },
  {
    id: '79',
    name: 'Jordan MVP',
    brand: 'Jordan',
    price: 150,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-79.jpg',
    affiliateLink: 'https://nike.com/jordan-mvp',
    rating: 4.6,
    reviews: 654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '80',
    name: 'Jordan Jumpman MVP',
    brand: 'Jordan',
    price: 125,
    originalPrice: 145,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-80.jpg',
    affiliateLink: 'https://nike.com/jordan-jumpman-mvp',
    rating: 4.5,
    reviews: 543,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '81',
    name: 'Jordan True Flight',
    brand: 'Jordan',
    price: 140,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-81.jpg',
    affiliateLink: 'https://nike.com/jordan-true-flight',
    rating: 4.4,
    reviews: 987,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '82',
    name: 'Jordan Flight Origin 4',
    brand: 'Jordan',
    price: 115,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-82.jpg',
    affiliateLink: 'https://nike.com/jordan-flight-origin-4',
    rating: 4.3,
    reviews: 765,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '83',
    name: 'Jordan ADG 4',
    brand: 'Jordan',
    price: 185,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-83.jpg',
    affiliateLink: 'https://nike.com/jordan-adg-4',
    rating: 4.6,
    reviews: 432,
    category: 'Golf',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '84',
    name: 'Jordan Retro 5 Golf',
    brand: 'Jordan',
    price: 220,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-84.jpg',
    affiliateLink: 'https://nike.com/jordan-5-golf',
    rating: 4.7,
    reviews: 321,
    category: 'Golf',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '85',
    name: 'Jordan Series ES',
    brand: 'Jordan',
    price: 90,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-85.jpg',
    affiliateLink: 'https://nike.com/jordan-series-es',
    rating: 4.3,
    reviews: 1234,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '86',
    name: 'Jordan Heir',
    brand: 'Jordan',
    price: 115,
    originalPrice: 130,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-86.jpg',
    affiliateLink: 'https://nike.com/jordan-heir',
    rating: 4.4,
    reviews: 876,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11', '12']
  },
  {
    id: '87',
    name: 'Air Jordan Legacy 312 Low',
    brand: 'Jordan',
    price: 145,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-87.jpg',
    affiliateLink: 'https://nike.com/jordan-legacy-312-low',
    rating: 4.5,
    reviews: 1654,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '88',
    name: 'Air Jordan Legacy 312',
    brand: 'Jordan',
    price: 160,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-88.jpg',
    affiliateLink: 'https://nike.com/jordan-legacy-312',
    rating: 4.5,
    reviews: 1432,
    category: 'Casual',
    sizes: ['8', '9', '10', '11', '12']
  }
]

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [results, setResults] = useState<ShoeProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [filterBrand, setFilterBrand] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])

  useEffect(() => {
    const searchShoes = async () => {
      setLoading(true)
      
      // Simulate API search
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Filter mock results based on query
      let filteredResults = mockSearchResults
      
      if (query) {
        filteredResults = mockSearchResults.filter(shoe =>
          shoe.name.toLowerCase().includes(query.toLowerCase()) ||
          shoe.brand.toLowerCase().includes(query.toLowerCase()) ||
          shoe.category.toLowerCase().includes(query.toLowerCase())
        )
      }
      
      // Apply filters
      if (filterBrand) {
        filteredResults = filteredResults.filter(shoe =>
          shoe.brand.toLowerCase() === filterBrand.toLowerCase()
        )
      }
      
      filteredResults = filteredResults.filter(shoe =>
        shoe.price >= priceRange[0] && shoe.price <= priceRange[1]
      )
      
      // Apply sorting
      if (sortBy === 'price-low') {
        filteredResults.sort((a, b) => a.price - b.price)
      } else if (sortBy === 'price-high') {
        filteredResults.sort((a, b) => b.price - a.price)
      } else if (sortBy === 'rating') {
        filteredResults.sort((a, b) => b.rating - a.rating)
      }
      
      setResults(filteredResults)
      setLoading(false)
    }

    searchShoes()
  }, [query, filterBrand, priceRange, sortBy])

  const handleAffiliateClick = (affiliateLink: string, productName: string) => {
    console.log(`Affiliate click: ${productName}`)
    window.open(affiliateLink, '_blank', 'noopener,noreferrer')
  }

  const brands = Array.from(new Set(mockSearchResults.map(shoe => shoe.brand)))

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Filters */}
        <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        {/* Loading Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-200"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left side filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Price:</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-20"
              />
              <span className="text-sm text-gray-600">${priceRange[1]}</span>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {results.length} results {query && `for "${query}"`}
        </p>
      </div>

      {/* Results Grid/List */}
      {results.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold text-black mb-2">
            No shoes found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
        }>
          {results.map((shoe) => (
            <div
              key={shoe.id}
              className={viewMode === 'grid'
                ? 'bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300'
                : 'bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-lg transition-shadow duration-300'
              }
            >
              {/* Product Image */}
              <div className={viewMode === 'grid'
                ? 'aspect-square bg-gray-100 relative group'
                : 'w-24 h-24 bg-gray-100 rounded-lg relative flex-shrink-0'
              }>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-lg">
                  <div className="text-gray-500 text-center">
                    <div className={viewMode === 'grid' ? 'text-4xl mb-2' : 'text-2xl'}>👟</div>
                    {viewMode === 'grid' && <p className="text-sm">{shoe.brand}</p>}
                  </div>
                </div>
                
                {/* Discount Badge */}
                {shoe.originalPrice && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    {Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className={viewMode === 'grid' ? 'p-6' : 'flex-1'}>
                <div className="mb-2">
                  <p className="text-sm text-gray-600 font-medium">{shoe.brand}</p>
                  <h3 className={viewMode === 'grid' ? 'text-lg font-semibold text-black' : 'text-base font-semibold text-black'}>
                    {shoe.name}
                  </h3>
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

                {/* Price & Actions */}
                <div className={viewMode === 'grid' 
                  ? 'space-y-4'
                  : 'flex items-center justify-between'
                }>
                  <div className="flex items-baseline">
                    <span className={viewMode === 'grid' ? 'text-2xl font-bold text-black' : 'text-xl font-bold text-black'}>
                      ${shoe.price}
                    </span>
                    {shoe.originalPrice && (
                      <span className={viewMode === 'grid' ? 'ml-2 text-lg text-gray-500 line-through' : 'ml-2 text-base text-gray-500 line-through'}>
                        ${shoe.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className={viewMode === 'grid' 
                    ? 'flex items-center justify-between'
                    : 'flex items-center gap-4'
                  }>
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
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchResults
