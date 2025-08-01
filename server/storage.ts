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
