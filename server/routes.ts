import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertFavoriteSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems();
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.json(cartItem);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid cart item data" });
    }
  });

  app.put("/api/cart/:productId", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }
      
      const cartItem = await storage.updateCartItemQuantity(req.params.productId, quantity);
      if (!cartItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:productId", async (req, res) => {
    try {
      const success = await storage.removeFromCart(req.params.productId);
      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      await storage.clearCart();
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Favorites
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const validatedData = insertFavoriteSchema.parse(req.body);
      const favorite = await storage.addToFavorites(validatedData);
      res.json(favorite);
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid favorite data" });
    }
  });

  app.delete("/api/favorites/:productId", async (req, res) => {
    try {
      const success = await storage.removeFromFavorites(req.params.productId);
      if (!success) {
        return res.status(404).json({ message: "Favorite not found" });
      }
      res.json({ message: "Item removed from favorites" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
