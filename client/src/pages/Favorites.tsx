import {
  Box,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '@/hooks/useFavorites';
import ProductGrid from '@/components/product/ProductGrid';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function Favorites() {
  const { t } = useTranslation();
  const { items, isLoading } = useFavorites();

  if (isLoading) {
    return <LoadingSkeleton variant="product" count={8} />;
  }

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h4" gutterBottom>
          {t('favorites.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('favorites.empty')}
        </Typography>
        <Link href="/">
          <Button variant="contained" sx={{ mt: 2 }}>
            Browse Products
          </Button>
        </Link>
      </Box>
    );
  }

  const products = items.map(item => item.product);

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('favorites.title')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {items.length} {items.length === 1 ? 'item' : 'items'} in your favorites
        </Typography>
      </Box>

      <ProductGrid products={products} />
    </Box>
  );
}
