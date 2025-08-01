import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import favoritesSlice from './favoritesSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    favorites: favoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
