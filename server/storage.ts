import { type Product, type CartItem, type Favorite, type InsertProduct, type InsertCartItem, type InsertFavorite, type CartItemWithProduct, type FavoriteWithProduct } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(): Promise<CartItemWithProduct[]>;
  getCartItem(productId: string): Promise<CartItem | undefined>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(productId: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(productId: string): Promise<boolean>;
  clearCart(): Promise<void>;
  
  // Favorites
  getFavorites(): Promise<FavoriteWithProduct[]>;
  getFavorite(productId: string): Promise<Favorite | undefined>;
  addToFavorites(favorite: InsertFavorite): Promise<Favorite>;
  removeFromFavorites(productId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem> = new Map();
  private favorites: Map<string, Favorite> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed with initial product data
    const initialProducts: Product[] = [
      {
        id: "1",
        title: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
        price: "89.99",
        originalPrice: "105.99",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 324,
        isOnSale: true,
        badge: "15% OFF",
        createdAt: new Date(),
      },
      {
        id: "2",
        title: "Latest Smartphone Pro",
        description: "Cutting-edge smartphone with advanced camera system and powerful processor.",
        price: "699.99",
        originalPrice: null,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "5.0",
        reviewCount: 156,
        isOnSale: false,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "3",
        title: "RGB Gaming Keyboard",
        description: "Mechanical gaming keyboard with customizable RGB lighting and responsive keys.",
        price: "129.99",
        originalPrice: null,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.2",
        reviewCount: 89,
        isOnSale: false,
        badge: "NEW",
        createdAt: new Date(),
      },
      {
        id: "4",
        title: "Fitness Smartwatch",
        description: "Advanced fitness tracking smartwatch with heart rate monitoring and GPS.",
        price: "249.99",
        originalPrice: "299.99",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.1",
        reviewCount: 201,
        isOnSale: true,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "5",
        title: "Premium Laptop Bag",
        description: "Professional leather laptop bag with multiple compartments and premium materials.",
        price: "159.99",
        originalPrice: null,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 76,
        isOnSale: false,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "6",
        title: "Portable Bluetooth Speaker",
        description: "High-quality portable speaker with excellent sound quality and long battery life.",
        price: "79.99",
        originalPrice: "99.99",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 433,
        isOnSale: true,
        badge: "BESTSELLER",
        createdAt: new Date(),
      },
      {
        id: "7",
        title: "Professional Camera Kit",
        description: "Complete professional camera kit with interchangeable lenses and accessories.",
        price: "1299.99",
        originalPrice: null,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.9",
        reviewCount: 67,
        isOnSale: false,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "8",
        title: "Ergonomic Office Chair",
        description: "Comfortable ergonomic office chair with lumbar support and adjustable height.",
        price: "299.99",
        originalPrice: "399.99",
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 128,
        isOnSale: true,
        badge: "25% OFF",
        createdAt: new Date(),
      },
      {
        id: "9",
        title: "Classic Cotton T-Shirt",
        description: "Premium quality 100% cotton t-shirt in various colors and sizes.",
        price: "24.99",
        originalPrice: "29.99",
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 287,
        isOnSale: true,
        badge: "SALE",
        createdAt: new Date(),
      },
      {
        id: "10",
        title: "Designer Denim Jeans",
        description: "Premium designer jeans with perfect fit and lasting comfort.",
        price: "89.99",
        originalPrice: null,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 145,
        isOnSale: false,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "11",
        title: "Running Sneakers Pro",
        description: "High-performance running shoes with advanced cushioning and breathable design.",
        price: "119.99",
        originalPrice: "149.99",
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 392,
        isOnSale: true,
        badge: "20% OFF",
        createdAt: new Date(),
      },
      {
        id: "12",
        title: "Leather Business Shoes",
        description: "Elegant leather dress shoes perfect for business and formal occasions.",
        price: "179.99",
        originalPrice: null,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 78,
        isOnSale: false,
        badge: "PREMIUM",
        createdAt: new Date(),
      },
      {
        id: "13",
        title: "Organic Skincare Set",
        description: "Complete organic skincare routine with natural ingredients for all skin types.",
        price: "69.99",
        originalPrice: "89.99",
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 234,
        isOnSale: true,
        badge: "NATURAL",
        createdAt: new Date(),
      },
      {
        id: "14",
        title: "Professional Makeup Kit",
        description: "Complete professional makeup kit with high-quality brushes and cosmetics.",
        price: "149.99",
        originalPrice: null,
        category: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.9",
        reviewCount: 167,
        isOnSale: false,
        badge: "PRO",
        createdAt: new Date(),
      },
      {
        id: "15",
        title: "Modern Coffee Table",
        description: "Sleek modern coffee table with tempered glass top and wooden legs.",
        price: "229.99",
        originalPrice: "279.99",
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.3",
        reviewCount: 89,
        isOnSale: true,
        badge: "18% OFF",
        createdAt: new Date(),
      },
      {
        id: "16",
        title: "Bookshelf - 5 Tier",
        description: "Sturdy wooden bookshelf with 5 tiers, perfect for home office or living room.",
        price: "199.99",
        originalPrice: null,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.6",
        reviewCount: 156,
        isOnSale: false,
        badge: null,
        createdAt: new Date(),
      },
      {
        id: "17",
        title: "Yoga Mat Premium",
        description: "Non-slip premium yoga mat with extra cushioning for comfortable practice.",
        price: "39.99",
        originalPrice: "49.99",
        category: "Sports",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.7",
        reviewCount: 423,
        isOnSale: true,
        badge: "FITNESS",
        createdAt: new Date(),
      },
      {
        id: "18",
        title: "Dumbbells Set - 20kg",
        description: "Adjustable dumbbell set with comfortable grip, perfect for home workouts.",
        price: "89.99",
        originalPrice: null,
        category: "Sports",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.4",
        reviewCount: 198,
        isOnSale: false,
        badge: "STRONG",
        createdAt: new Date(),
      },
      {
        id: "19",
        title: "Leather Handbag",
        description: "Elegant leather handbag with multiple compartments and adjustable strap.",
        price: "129.99",
        originalPrice: "159.99",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        reviewCount: 267,
        isOnSale: true,
        badge: "LUXURY",
        createdAt: new Date(),
      },
      {
        id: "20",
        title: "Wireless Earbuds Pro",
        description: "Premium wireless earbuds with active noise cancellation and long battery life.",
        price: "159.99",
        originalPrice: "199.99",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.5",
        reviewCount: 334,
        isOnSale: true,
        badge: "TECH",
        createdAt: new Date(),
      },
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  // Cart
  async getCartItems(): Promise<CartItemWithProduct[]> {
    const items: CartItemWithProduct[] = [];
    for (const cartItem of this.cartItems.values()) {
      const product = this.products.get(cartItem.productId);
      if (product) {
        items.push({ ...cartItem, product });
      }
    }
    return items;
  }

  async getCartItem(productId: string): Promise<CartItem | undefined> {
    return Array.from(this.cartItems.values()).find(item => item.productId === productId);
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existingItem = await this.getCartItem(insertItem.productId);
    
    if (existingItem) {
      existingItem.quantity += insertItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    } else {
      const id = randomUUID();
      const cartItem: CartItem = {
        ...insertItem,
        id,
        createdAt: new Date(),
      };
      this.cartItems.set(id, cartItem);
      return cartItem;
    }
  }

  async updateCartItemQuantity(productId: string, quantity: number): Promise<CartItem | undefined> {
    const existingItem = await this.getCartItem(productId);
    if (existingItem) {
      existingItem.quantity = quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }
    return undefined;
  }

  async removeFromCart(productId: string): Promise<boolean> {
    const existingItem = await this.getCartItem(productId);
    if (existingItem) {
      this.cartItems.delete(existingItem.id);
      return true;
    }
    return false;
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  // Favorites
  async getFavorites(): Promise<FavoriteWithProduct[]> {
    const favorites: FavoriteWithProduct[] = [];
    for (const favorite of this.favorites.values()) {
      const product = this.products.get(favorite.productId);
      if (product) {
        favorites.push({ ...favorite, product });
      }
    }
    return favorites;
  }

  async getFavorite(productId: string): Promise<Favorite | undefined> {
    return Array.from(this.favorites.values()).find(fav => fav.productId === productId);
  }

  async addToFavorites(insertFavorite: InsertFavorite): Promise<Favorite> {
    const id = randomUUID();
    const favorite: Favorite = {
      ...insertFavorite,
      id,
      createdAt: new Date(),
    };
    this.favorites.set(id, favorite);
    return favorite;
  }

  async removeFromFavorites(productId: string): Promise<boolean> {
    const existingFavorite = await this.getFavorite(productId);
    if (existingFavorite) {
      this.favorites.delete(existingFavorite.id);
      return true;
    }
    return false;
  }
}

export const storage = new MemStorage();
