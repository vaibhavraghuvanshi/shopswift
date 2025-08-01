import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { FavoriteWithProduct, InsertFavorite } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { RootState } from '@/store';
import { 
  setFavorites, 
  addToFavoritesLocal, 
  removeFromFavoritesLocal,
  setLoading 
} from '@/store/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const favoritesState = useSelector((state: RootState) => state.favorites);

  const favoritesQuery = useQuery<FavoriteWithProduct[]>({
    queryKey: ['/api/favorites'],
    onSuccess: (data) => {
      dispatch(setFavorites(data));
    },
  });

  const addToFavoritesMutation = useMutation({
    mutationFn: async (favorite: InsertFavorite) => {
      const response = await apiRequest('POST', '/api/favorites', favorite);
      return response.json();
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      enqueueSnackbar(t('notifications.addedToFavorites'), { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const removeFromFavoritesMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest('DELETE', `/api/favorites/${productId}`);
      return response.json();
    },
    onMutate: (productId) => {
      dispatch(removeFromFavoritesLocal(productId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      enqueueSnackbar(t('notifications.removedFromFavorites'), { variant: 'info' });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
    },
  });

  const isFavorite = (productId: string) => {
    return favoritesState.items.some(item => item.productId === productId);
  };

  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavoritesMutation.mutate(productId);
    } else {
      addToFavoritesMutation.mutate({ productId });
    }
  };

  return {
    ...favoritesState,
    isLoading: favoritesQuery.isLoading || favoritesState.isLoading,
    addToFavorites: addToFavoritesMutation.mutate,
    removeFromFavorites: removeFromFavoritesMutation.mutate,
    isFavorite,
    toggleFavorite,
  };
};
