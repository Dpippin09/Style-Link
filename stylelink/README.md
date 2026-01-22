# StyleLink - PWA Shoe Shopping & Price Comparison App

StyleLink is a Progressive Web App (PWA) for shoe shopping and price comparison that can be installed on mobile devices and desktop computers like a native app.

## 🚀 PWA Features

### Mobile App Installation
- **Installable**: Users can install StyleLink directly from their browser to their home screen
- **App Store Ready**: Configured for submission to app stores via PWA builders
- **Native Feel**: Runs in standalone mode without browser UI when installed
- **Offline Support**: Core functionality works offline with cached content

### PWA Capabilities
- ✅ **Web App Manifest**: Configured with app icons, theme colors, and metadata
- ✅ **Service Worker**: Caches resources for offline functionality
- ✅ **Install Prompt**: Smart install banner when criteria are met
- ✅ **Offline Page**: Custom offline experience with helpful tips
- ✅ **Push Notifications**: Ready for price alerts and deal notifications
- ✅ **Background Sync**: Syncs data when connection returns

### Mobile Optimization
- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large touch targets and gesture support
- **Fast Loading**: Optimized images and code splitting
- **Smooth Animations**: Hardware-accelerated transitions

## 🛠 Getting Started

### Development Server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
npm run build
npm start
```

### Testing PWA Features

1. **Development**: PWA features work in development mode
2. **Production**: Full PWA functionality in production builds
3. **HTTPS**: PWA features require HTTPS in production

## 📱 Installation Guide

### For Users

#### Mobile (iOS/Android)
1. Open StyleLink in your mobile browser
2. Look for "Install App" prompt or use browser menu
3. Tap "Add to Home Screen" or "Install"
4. App will appear on your home screen like a native app

#### Desktop (Chrome/Edge)
1. Visit StyleLink in your browser
2. Look for install icon in address bar
3. Click "Install StyleLink"
4. App opens in its own window

#### App Stores
StyleLink can be submitted to app stores using PWA packaging tools:
- **iOS App Store**: Via PWABuilder or similar tools
- **Google Play Store**: Via Trusted Web Activities (TWA)
- **Microsoft Store**: Direct PWA submission

## 🎨 Features

### Core Functionality
- **Price Comparison**: Compare shoe prices across multiple retailers
- **Saved Items**: Save and track your favorite shoes
- **Price Alerts**: Get notified when prices drop
- **Deal Discovery**: Browse curated deals and offers
- **Search & Filter**: Find exactly what you're looking for

### PWA-Specific Features
- **Offline Browsing**: View saved items without internet
- **Install Prompts**: Smart prompts to install the app
- **Background Updates**: App updates automatically
- **Push Notifications**: Price alerts and deal notifications
- **Share Integration**: Native sharing capabilities

## 🏗 Technical Architecture

### PWA Stack
- **Next.js 16**: React framework with PWA support
- **next-pwa**: Service worker and manifest generation
- **Workbox**: Advanced caching strategies
- **TypeScript**: Type-safe development

### Design System
- **Tailwind CSS**: Utility-first styling
- **Stone Color Palette**: Sophisticated tan-grey theme
- **Lucide Icons**: Beautiful, consistent iconography
- **Responsive Grid**: Mobile-first layouts

### Performance
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js image optimization
- **Caching Strategy**: Network-first with fallback
- **Bundle Size**: Optimized for fast loading

## 📋 App Store Submission

### Preparation Checklist
- [ ] App icons (all required sizes created)
- [ ] Screenshots for all device types
- [ ] App store descriptions and metadata
- [ ] Privacy policy and terms of service
- [ ] Age rating and content descriptions

### PWA Packaging Tools
- **PWABuilder** (Microsoft): Free PWA to app store packaging
- **Bubblewrap** (Google): Command-line TWA generator
- **PWA2APK**: Online PWA to APK converter

### Store-Specific Requirements
- **iOS**: Requires PWABuilder or similar wrapper
- **Android**: Can use TWA or native PWA support
- **Windows**: Direct PWA submission to Microsoft Store

## 🔧 Configuration

### Environment Variables
```bash
NEXT_PUBLIC_APP_NAME="StyleLink"
NEXT_PUBLIC_APP_DESCRIPTION="Shoe Shopping & Price Comparison"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### PWA Configuration
See `next.config.ts` for PWA settings:
- Service worker configuration
- Caching strategies
- Runtime caching rules
- Offline page routing

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
StyleLink can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Google Cloud Platform
- Azure Static Web Apps

## 📞 Support

For PWA-related questions:
- Check browser compatibility
- Ensure HTTPS in production
- Test on actual devices
- Validate service worker registration

---

**StyleLink** - Your mobile-first shoe shopping companion! 👟📱
