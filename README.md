# Style-Link 👟

A shoe shopping and price comparison app that helps users find the best deals on shoes from multiple retailers and earn affiliate commissions.

## Features

- 🔍 **Shoe Search**: Search for shoes by name or brand
- 💰 **Price Comparison**: Compare prices across multiple retailers
- 🏆 **Best Deal Highlighting**: Automatically identifies and highlights the best price
- 💵 **Savings Calculator**: Shows how much you can save by choosing the best deal
- 🔗 **Affiliate Links**: Integrated affiliate links for commission tracking
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📊 **Click Tracking**: Tracks user clicks for analytics and commission purposes

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Dpippin09/Style-Link.git
cd Style-Link
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## How It Works

### Search Functionality
Users can search for shoes by entering keywords like brand names (Nike, Adidas) or shoe models (Air Max, Ultraboost).

### Price Comparison
The app displays prices from multiple retailers for each shoe, making it easy to compare and find the best deal.

### Affiliate Commission
When users click through to a retailer and make a purchase, Style-Link earns an affiliate commission through the tracked affiliate links.

### Click Tracking
All clicks on retailer links are tracked with:
- Shoe ID
- Retailer name
- Timestamp
- Session ID

This data can be used for analytics and commission verification.

## Architecture

### Components
- **App.js**: Main application component with search state management
- **SearchBar**: Search input component
- **ShoeResults**: Displays grid of shoe results
- **ShoeCard**: Individual shoe card with price comparison and retailer links

### Services
- **shoeService.js**: Handles shoe search and data retrieval
- **affiliateService.js**: Manages affiliate link generation and click tracking

## Future Enhancements

- Integration with real retailer APIs
- User accounts and saved searches
- Price alerts and notifications
- Advanced filtering (size, color, price range)
- Purchase history tracking
- Backend API for click tracking and analytics
- Real-time price updates
- More retailer integrations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.
