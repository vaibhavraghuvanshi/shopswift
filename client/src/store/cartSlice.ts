import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemWithProduct } from '@shared/schema';

interface CartState {
  items: CartItemWithProduct[];
  isLoading: boolean;
  total: number;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  total: 0,
};

const calculateTotal = (items: CartItemWithProduct[]): number => {
  return items.reduce((total, item) => {
    return total + (parseFloat(item.product.price) * item.quantity);
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<CartItemWithProduct[]>) => {
      state.items = action.payload;
      state.total = calculateTotal(action.payload);
    },
    addToCartLocal: (state, action: PayloadAction<CartItemWithProduct>) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state.items);
    },
    updateQuantityLocal: (state, action: PayloadAction<{productId: string, quantity: number}>) => {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    removeFromCartLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
      state.total = calculateTotal(state.items);
    },
    clearCartLocal: (state) => {
      state.items = [];
      state.total = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCartItems,
  addToCartLocal,
  updateQuantityLocal,
  removeFromCartLocal,
  clearCartLocal,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
