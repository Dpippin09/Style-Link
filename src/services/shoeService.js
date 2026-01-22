// Mock shoe database - In production, this would call a real API
const mockShoeData = [
  {
    id: 1,
    name: "Nike Air Max 270",
    brand: "Nike",
    image: "https://via.placeholder.com/300x300/667eea/ffffff?text=Nike+Air+Max+270",
    retailers: [
      { name: "Nike.com", price: 150.00, url: "https://nike.com" },
      { name: "Foot Locker", price: 145.00, url: "https://footlocker.com" },
      { name: "Amazon", price: 139.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    brand: "Adidas",
    image: "https://via.placeholder.com/300x300/764ba2/ffffff?text=Adidas+Ultraboost",
    retailers: [
      { name: "Adidas.com", price: 190.00, url: "https://adidas.com" },
      { name: "Dick's Sporting Goods", price: 185.00, url: "https://dickssportinggoods.com" },
      { name: "Amazon", price: 179.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 3,
    name: "New Balance 990v5",
    brand: "New Balance",
    image: "https://via.placeholder.com/300x300/48bb78/ffffff?text=New+Balance+990",
    retailers: [
      { name: "New Balance", price: 185.00, url: "https://newbalance.com" },
      { name: "Zappos", price: 184.95, url: "https://zappos.com" },
      { name: "Amazon", price: 175.00, url: "https://amazon.com" }
    ]
  },
  {
    id: 4,
    name: "Nike React Infinity Run",
    brand: "Nike",
    image: "https://via.placeholder.com/300x300/f56565/ffffff?text=Nike+React",
    retailers: [
      { name: "Nike.com", price: 160.00, url: "https://nike.com" },
      { name: "Running Warehouse", price: 155.00, url: "https://runningwarehouse.com" },
      { name: "Amazon", price: 149.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 5,
    name: "Adidas Stan Smith",
    brand: "Adidas",
    image: "https://via.placeholder.com/300x300/ed8936/ffffff?text=Stan+Smith",
    retailers: [
      { name: "Adidas.com", price: 85.00, url: "https://adidas.com" },
      { name: "Foot Locker", price: 80.00, url: "https://footlocker.com" },
      { name: "Amazon", price: 75.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 6,
    name: "Puma RS-X3",
    brand: "Puma",
    image: "https://via.placeholder.com/300x300/9f7aea/ffffff?text=Puma+RS-X3",
    retailers: [
      { name: "Puma.com", price: 110.00, url: "https://puma.com" },
      { name: "Foot Locker", price: 105.00, url: "https://footlocker.com" },
      { name: "Amazon", price: 99.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 7,
    name: "Converse Chuck Taylor All Star",
    brand: "Converse",
    image: "https://via.placeholder.com/300x300/4299e1/ffffff?text=Chuck+Taylor",
    retailers: [
      { name: "Converse.com", price: 55.00, url: "https://converse.com" },
      { name: "Zappos", price: 54.95, url: "https://zappos.com" },
      { name: "Amazon", price: 49.99, url: "https://amazon.com" }
    ]
  },
  {
    id: 8,
    name: "Nike Air Force 1",
    brand: "Nike",
    image: "https://via.placeholder.com/300x300/38b2ac/ffffff?text=Air+Force+1",
    retailers: [
      { name: "Nike.com", price: 90.00, url: "https://nike.com" },
      { name: "Foot Locker", price: 90.00, url: "https://footlocker.com" },
      { name: "Amazon", price: 85.00, url: "https://amazon.com" }
    ]
  }
];

/**
 * Search for shoes based on query
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of matching shoes
 */
export const searchShoes = async (query) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const lowerQuery = query.toLowerCase();
  
  // Filter shoes that match the search query
  const results = mockShoeData.filter(shoe => 
    shoe.name.toLowerCase().includes(lowerQuery) ||
    shoe.brand.toLowerCase().includes(lowerQuery)
  );
  
  return results;
};

/**
 * Get shoe by ID
 * @param {number} id - Shoe ID
 * @returns {Promise<Object|null>} - Shoe object or null
 */
export const getShoeById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockShoeData.find(shoe => shoe.id === id) || null;
};
