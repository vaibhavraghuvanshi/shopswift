# Modern E-Commerce Application

A fully responsive e-commerce web application built with React, TypeScript, Material-UI, and Express. Features a complete shopping experience with multi-language support, dark mode, and modern UI components.

## 🌟 Features

### Core E-Commerce Functionality
- **Product Catalog** - Browse products with detailed information, images, and ratings
- **Search & Filtering** - Advanced search with category filters, price range, and rating filters
- **Shopping Cart** - Add, remove, and update product quantities with real-time totals
- **Favorites/Wishlist** - Save favorite products for later viewing
- **Product Details** - Comprehensive product pages with descriptions and specifications

### User Experience
- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Multi-Language Support** - English, Spanish, and Arabic with RTL support
- **Modern UI** - Clean, accessible interface with smooth animations
- **Toast Notifications** - Real-time feedback for user actions

### Technical Features
- **TypeScript** - Full type safety across frontend and backend
- **Real-time Updates** - Optimistic updates with server synchronization
- **State Management** - Redux Toolkit for global state management
- **Data Caching** - TanStack Query for efficient data fetching and caching
- **Loading States** - Skeleton loading animations for better UX

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Material-UI (MUI)** - Comprehensive React component library
- **Redux Toolkit** - Predictable state container
- **TanStack Query** - Server state management and caching
- **Wouter** - Lightweight client-side routing
- **i18next** - Internationalization framework
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **In-Memory Storage** - Fast development with easy database migration path
- **Zod** - Schema validation and type inference

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Drizzle ORM** - Type-safe database toolkit (configured for future use)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Generic components (LoadingSkeleton, etc.)
│   │   │   ├── layout/     # Layout components (AppBar, Layout)
│   │   │   └── product/    # Product-specific components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── i18n/           # Internationalization
│   │   │   └── locales/    # Translation files (en, es, ar)
│   │   ├── pages/          # Page components
│   │   ├── providers/      # Context providers
│   │   ├── store/          # Redux store configuration
│   │   ├── theme/          # Material-UI theme configuration
│   │   └── types/          # TypeScript type definitions
│   └── index.html          # HTML template
├── server/                 # Backend application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema and types
└── README.md              # Project documentation
```

## 🌍 Multi-Language Support

The application supports three languages with full localization:

- **English (en)** - Default language, left-to-right
- **Spanish (es)** - Spanish translations, left-to-right  
- **Arabic (ar)** - Arabic translations, right-to-left (RTL)

### RTL Support
- Automatic text direction switching for Arabic
- Mirrored layout components
- Proper font loading for Arabic script (Cairo font)
- Cultural adaptations for UI elements

## 🎨 Theme System

### Dark/Light Mode
- System preference detection
- Manual theme toggle
- Persistent theme selection
- Material-UI theme integration

### Responsive Design
- Mobile-first approach
- Breakpoint-based layout adjustments
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Shopping Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Favorites
- `GET /api/favorites` - Get favorite items
- `POST /api/favorites` - Add item to favorites
- `DELETE /api/favorites/:productId` - Remove item from favorites

## 🔄 State Management

### Global State (Redux)
- **Cart State** - Shopping cart items and totals
- **Favorites State** - User's favorite products
- **UI State** - Loading states and user preferences

### Server State (TanStack Query)
- **Product Data** - Cached product information
- **API Synchronization** - Automatic background updates
- **Optimistic Updates** - Immediate UI feedback

## 🎯 Key Components

### ProductCard
- Product display with image, title, price, and rating
- Add to cart and favorites functionality
- Hover effects and responsive design

### FilterSidebar
- Category filtering
- Price range selection
- Rating filters
- Clear all filters option

### AppBar
- Search functionality
- Language switcher
- Theme toggle
- Cart and favorites indicators

### Layout
- Consistent page structure
- Mobile navigation
- Floating action buttons

## 🚢 Deployment

The application is configured for easy deployment on Replit:

1. **Development**: `npm run dev`
2. **Production**: The app is ready to deploy with Replit's built-in deployment

### Environment Variables
No additional environment variables are required for basic functionality.

## 🔮 Future Enhancements

### Planned Features
- User authentication and accounts
- Order history and tracking
- Payment integration
- Product reviews and ratings
- Inventory management
- Email notifications

### Technical Improvements
- Database integration (PostgreSQL with Drizzle ORM)
- Image optimization and CDN
- Progressive Web App (PWA) features
- Advanced search with Elasticsearch
- Performance monitoring

## 📝 Development Notes

### Code Quality
- TypeScript for type safety
- ESLint for code consistency
- Component composition patterns
- Custom hooks for reusable logic

### Performance
- Lazy loading for route components
- Image optimization
- Bundle splitting
- Memoization for expensive operations

### Accessibility
- WCAG compliance through Material-UI
- Keyboard navigation support
- Screen reader compatibility
- Color contrast optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI team for the excellent component library
- React and TypeScript communities
- Open source contributors

---

**Built with ❤️ using modern web technologies**