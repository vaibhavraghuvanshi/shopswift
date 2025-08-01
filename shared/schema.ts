import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  image: text("image").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviewCount: integer("review_count").notNull().default(0),
  isOnSale: boolean("is_on_sale").notNull().default(false),
  badge: text("badge"), // NEW, BESTSELLER, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => products.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertFavoriteSchema = createInsertSchema(favorites).omit({
  id: true,
  createdAt: true,
});

export type Product = typeof products.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type InsertFavorite = z.infer<typeof insertFavoriteSchema>;

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface FavoriteWithProduct extends Favorite {
  product: Product;
}
