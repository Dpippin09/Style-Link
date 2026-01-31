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
    affiliateLink: 'https://www.nike.com/w?q=Air%20max%20270&vst=Air%20max%20270',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Force%201%20Low&vst=Air%20Force%201%20Low',
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
    affiliateLink: 'https://www.nike.com/w?q=Dunk%20Low&vst=Dunk%20Low',
    rating: 4.7,
    reviews: 2890,
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
    affiliateLink: 'https://www.nike.com/w?q=Dunk%20High&vst=Dunk%20High',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Max%2090&vst=Air%20Max%2090',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Max%2097&vst=Air%20Max%2097',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Max%2095&vst=Air%20Max%2095',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Max%201&vst=Air%20Max%201',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20VaporMax%20Plus&vst=Air%20VaporMax%20Plus',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20VaporMax%20Flyknit&vst=Air%20VaporMax%20Flyknit',
    rating: 4.5,
    reviews: 987,
    category: 'Running',
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '18',
    name: 'Cortez',
    brand: 'Nike',
    price: 90,
    retailer: 'Nike.com',
    image: '/placeholder-shoe-18.jpg',
    affiliateLink: 'https://www.nike.com/w?q=Cortez&vst=Cortez',
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
    affiliateLink: 'https://www.nike.com/w?q=Waffle%20One&vst=Waffle%20One',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Huarache&vst=Air%20Huarache',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Presto&vst=Air%20Presto',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Rift&vst=Air%20Rift',
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
    affiliateLink: 'https://www.nike.com/w?q=Shox%20TL&vst=Shox%20TL',
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
    affiliateLink: 'https://www.nike.com/w?q=Tech%20Hera&vst=Tech%20Hera',
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
    affiliateLink: 'https://www.nike.com/w?q=P-6000&vst=P-6000',
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
    affiliateLink: 'https://www.nike.com/w?q=V2K%20Run&vst=V2K%20Run',
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
    affiliateLink: 'https://www.nike.com/w?q=Zoom%20Vomero%205&vst=Zoom%20Vomero%205',
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
    affiliateLink: 'https://www.nike.com/w?q=LeBron%2021&vst=LeBron%2021',
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
    affiliateLink: 'https://www.nike.com/w?q=KD%2016&vst=KD%2016',
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
    affiliateLink: 'https://www.nike.com/w?q=Giannis%20Immortality%203&vst=Giannis%20Immortality%203',
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
    affiliateLink: 'https://www.nike.com/w/kobe-pgd6',
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
    affiliateLink: 'https://www.nike.com/w?q=Ja%201&vst=Ja%201',
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
    affiliateLink: 'https://www.nike.com/w?q=GT%20Cut%203&vst=GT%20Cut%203',
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
    affiliateLink: 'https://www.nike.com/w?q=Sabrina%201&vst=Sabrina%201',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Zoom%20GT%20Hustle%202&vst=Air%20Zoom%20GT%20Hustle%202',
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
    affiliateLink: 'https://www.nike.com/w/devin-booker-auvv',
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
    affiliateLink: 'https://www.nike.com/w?q=SB%20Dunk%20Low%20Pro&vst=SB%20Dunk%20Low%20Pro',
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
    affiliateLink: 'https://www.nike.com/w?q=SB%20Dunk%20High%20Pro&vst=SB%20Dunk%20High%20Pro',
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
    affiliateLink: 'https://www.nike.com/w?q=SB%20Blazer%20Mid&vst=SB%20Blazer%20Mid',
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
    affiliateLink: 'https://www.nike.com/w/mens-skateboarding-shoes-8mfrfznik1zy7ok',
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
    affiliateLink: 'https://www.nike.com/w?q=Metcon%209&vst=Metcon%209',
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
    affiliateLink: 'https://www.nike.com/w?q=Free%20Metcon%205&vst=Free%20Metcon%205',
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
    affiliateLink: 'https://www.nike.com/w?q=SuperRep%20Go%203&vst=SuperRep%20Go%203',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Zoom%20TR%201&vst=Air%20Zoom%20TR%201',
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
    affiliateLink: 'https://www.nike.com/w?q=Romaleos%204&vst=Romaleos%204',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Ultra+Boost+22&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Ultra+Boost+Light&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/superstar',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Stan+Smith&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/stan-smith-freizeit-spongebob-shoes/JQ6779.html',
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
    affiliateLink: 'https://www.adidas.com/us/sportswear-shoes',
    rating: 4.5,
    reviews: 1543,
    category: 'Casual',
    sizes: ['7', '8', '9', '10', '11']
  },
  {
    id: '105',
    name: 'Samba OG',
    brand: 'Adidas',
    price: 100,
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-105.jpg',
    affiliateLink: 'https://www.adidas.com/us/search?q=Samba+OG&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Samba+Classic&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/gazelle',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Gazelle+Bold&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Campus+00s&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Forum+Low&sitePath=us',
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
    affiliateLink: 'http://adidas.com/us/forum-mid-shoes/IG3756.html',
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
    affiliateLink: 'https://www.adidas.com/us/forum',
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
    affiliateLink: 'https://www.adidas.com/us/originals-shoes',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Ozweego&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Ozelia&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Retropy+E5&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=ZX+1K+Boost+2.0&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=ZX+22+Boost&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/adilette-22-slides/HQ4670.html',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adilette+Comfort&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adizero+Adios+Pro+3&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adizero+Boston+12&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adizero+SL&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/supernova',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Supernova+3&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Solarglide+6&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Runfalcon+3.0&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Duramo+Speed&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/pureboost-23-shoes/IF1541.html',
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
    affiliateLink: 'http://adidas.com/us/anthony_edwards',
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
    affiliateLink: 'https://www.adidas.com/us/james_harden',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Dame+8&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Trae+Young+3&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/donovan_mitchell',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adizero+Select&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Dropset+2+Trainer&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Dropset+3+Trainer&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Adipower+Weightlifting+3&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Powerlift+5&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Trainer+V&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Copa+Pure+2+Elite+FG&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Predator+Elite+FG&sitePath=us',
    retailer: 'Adidas.com',
    image: '/placeholder-shoe-148.jpg',
    affiliateLink: 'https://www.adidas.com/us/search?q=X+Crazyfast+Elite+FG&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=F50+Elite+FG&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Predator+Accuracy.3+TF&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Busenitz+Vulc+II&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/skateboarding',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Forum+84+ADV&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Aloha+Super&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Puig&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/free_hiker',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Terrex+AX4&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Terrex+Swift+R3+GTX&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Terrex+Trailmaker+2&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/spezial',
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
    affiliateLink: 'http://adidas.com/us/search?q=Country+OG&sitePath=us',
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
    affiliateLink: 'https://www.adidas.com/us/search?q=Handball+Spezial&sitePath=us',
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
      affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%201%20Retro%20High%20OG&vst=Air%20Jordan%201%20Retro%20High%20OG',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%201%20Low&vst=Air%20Jordan%201%20Low',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%201%20Mid&vst=Air%20Jordan%201%20Mid',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%202%20Retro&vst=Air%20Jordan%202%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=%20Air%20Jordan%203%20Retro&vst=%20Air%20Jordan%203%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%204%20Retro&vst=Air%20Jordan%204%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%205%20Retro&vst=Air%20Jordan%205%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%206%20Retro&vst=Air%20Jordan%206%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%207%20Retro&vst=Air%20Jordan%207%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%208%20Retro&vst=Air%20Jordan%208%20Retro',
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
    affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%209%20Retro&vst=Air%20Jordan%209%20Retro',
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
      affiliateLink: 'https://www.nike.com/w?q=Air%20Jordan%2011%20Low&vst=Air%20Jordan%2011%20Low',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Max%20Aura%204&vst=Jordan%20Max%20Aura%204',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Delta%203%20Low&vst=Jordan%20Delta%203%20Low',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Nu%20Retro%201%20Low&vst=Jordan%20Nu%20Retro%201%20Low',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Spizike%20Low&vst=Jordan%20Spizike%20Low',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Luka%202&vst=Jordan%20Luka%202',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Tatum%202&vst=Jordan%20Tatum%202',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Zion%203&vst=Jordan%20Zion%203',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20MVP&vst=Jordan%20MVP',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Jumpman%20MVP&vst=Jordan%20Jumpman%20MVP',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20True%20Flight&vst=Jordan%20True%20Flight',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Flight%20Origin%204&vst=Jordan%20Flight%20Origin%204',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20ADG%204&vst=Jordan%20ADG%204',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Retro%205%20Golf&vst=Jordan%20Retro%205%20Golf',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Series%20ES&vst=Jordan%20Series%20ES',
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
      affiliateLink: 'https://www.nike.com/w?q=Jordan%20Heir&vst=Jordan%20Heir',
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
                      {shoe.retailer ? `Buy at ${shoe.retailer.replace(/\..*$/, '')}` : 'Buy Now'}
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
