import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FavoriteWithProduct } from '@shared/schema';

interface FavoritesState {
  items: FavoriteWithProduct[];
  isLoading: boolean;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<FavoriteWithProduct[]>) => {
      state.items = action.payload;
    },
    addToFavoritesLocal: (state, action: PayloadAction<FavoriteWithProduct>) => {
      const exists = state.items.find(item => item.productId === action.payload.productId);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavoritesLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFavorites,
  addToFavoritesLocal,
  removeFromFavoritesLocal,
  setLoading,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
