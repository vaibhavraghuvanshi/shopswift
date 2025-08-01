import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { CartItemWithProduct, InsertCartItem } from '@shared/schema';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { RootState } from '@/store';
import { 
  setCartItems, 
  addToCartLocal, 
  updateQuantityLocal, 
  removeFromCartLocal, 
  clearCartLocal,
  setLoading 
} from '@/store/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const cartState = useSelector((state: RootState) => state.cart);

  const cartQuery = useQuery<CartItemWithProduct[]>({
    queryKey: ['/api/cart'],
    onSuccess: (data) => {
      dispatch(setCartItems(data));
    },
  });

  const addToCartMutation = useMutation({
    mutationFn: async (item: InsertCartItem) => {
      const response = await apiRequest('POST', '/api/cart', item);
      return response.json();
    },
    onMutate: () => {
      dispatch(setLoading(true));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      enqueueSnackbar(t('notifications.addedToCart'), { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
    },
    onSettled: () => {
      dispatch(setLoading(false));
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const response = await apiRequest('PUT', `/api/cart/${productId}`, { quantity });
      return response.json();
    },
    onMutate: ({ productId, quantity }) => {
      dispatch(updateQuantityLocal({ productId, quantity }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      enqueueSnackbar(t('notifications.cartUpdated'), { variant: 'success' });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest('DELETE', `/api/cart/${productId}`);
      return response.json();
    },
    onMutate: (productId) => {
      dispatch(removeFromCartLocal(productId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
      enqueueSnackbar(t('notifications.removedFromCart'), { variant: 'info' });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', '/api/cart');
      return response.json();
    },
    onMutate: () => {
      dispatch(clearCartLocal());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
    onError: () => {
      enqueueSnackbar(t('notifications.error'), { variant: 'error' });
      queryClient.invalidateQueries({ queryKey: ['/api/cart'] });
    },
  });

  return {
    ...cartState,
    isLoading: cartQuery.isLoading || cartState.isLoading,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };
};
