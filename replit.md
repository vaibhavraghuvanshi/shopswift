# Overview

This is a modern full-stack e-commerce web application built with React and Express. The application provides a complete shopping experience with product browsing, cart management, and favorites functionality. It features a responsive design with Material-UI components, state management with Redux Toolkit, and server-side data handling with a PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with Vite for fast development and builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Hybrid approach using both Material-UI (MUI) and custom shadcn/ui components
- **State Management**: Redux Toolkit for global state (cart and favorites)
- **Data Fetching**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Internationalization**: i18next for multi-language support (English/Spanish)
- **Theme System**: Custom ThemeRegistry with light/dark mode support using MUI theming

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful endpoints for products, cart, and favorites
- **Data Layer**: In-memory storage with interface for easy database migration
- **Database Schema**: Drizzle ORM with PostgreSQL support (configured but using memory storage)
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement with Vite integration

## Database Design
- **Products**: Core product information with pricing, ratings, categories, and images
- **Cart Items**: User cart with product references and quantities
- **Favorites**: User favorite products with timestamps
- **Relationships**: Foreign key constraints between cart/favorites and products

## State Management Strategy
- **Local State**: React hooks for component-specific state
- **Global State**: Redux for cart and favorites (persistent across page reloads)
- **Server State**: React Query for API data with automatic caching and synchronization
- **Form State**: React Hook Form with Zod validation (configured but not fully implemented)

## Responsive Design Approach
- **Mobile-First**: Tailwind CSS with responsive breakpoints
- **Component Adaptation**: Material-UI's responsive utilities and custom hooks
- **Layout System**: Flexible container with sidebar filtering and grid/list view modes
- **Touch Interactions**: Mobile-optimized floating action buttons and touch targets

# External Dependencies

## UI and Styling
- **Material-UI**: Complete component library with theming system
- **Radix UI**: Accessible headless components (shadcn/ui integration)
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Type-safe component variants
- **Notistack**: Toast notification system

## Data and State Management  
- **Redux Toolkit**: Predictable state container with modern Redux patterns
- **TanStack Query**: Powerful data synchronization for server state
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Performant forms with easy validation

## Database and ORM
- **Drizzle ORM**: Type-safe SQL toolkit with PostgreSQL support
- **Neon Database**: Serverless PostgreSQL (configured via connection string)

## Development and Build Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

## Internationalization and Accessibility
- **i18next**: Internationalization framework with React integration
- **Lucide React**: Consistent icon library
- **WCAG Compliance**: Accessible components via Radix UI and Material-UI