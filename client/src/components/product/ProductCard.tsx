import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Button,
  Box,
  Chip,
  Rating,
  Skeleton,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
} from '@mui/icons-material';
import { Link } from 'wouter';
import { Product } from '@shared/schema';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}

export default function ProductCard({ product, loading = false }: ProductCardProps) {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (loading) {
    return (
      <Card>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={24} width="80%" />
          <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Skeleton variant="rectangular" width={80} height={16} />
            <Skeleton variant="text" width={40} height={16} />
          </Box>
          <Skeleton variant="rectangular" height={36} />
        </CardContent>
      </Card>
    );
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      quantity: 1,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  const isProductFavorite = isFavorite(product.id);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <Link href={`/products/${product.id}`}>
        <Box sx={{ position: 'relative', cursor: 'pointer' }}>
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={product.title}
            sx={{ objectFit: 'cover' }}
          />
          
          {/* Favorite Button */}
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'background.paper',
                transform: 'scale(1.1)',
              },
            }}
            onClick={handleToggleFavorite}
          >
            {isProductFavorite ? (
              <Favorite color="secondary" />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>

          {/* Badge */}
          {product.badge && (
            <Chip
              label={product.badge}
              size="small"
              color={product.isOnSale ? 'secondary' : 'primary'}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
      </Link>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Link href={`/products/${product.id}`}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontSize: '1rem',
              fontWeight: 500,
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                color: 'primary.main',
              },
            }}
            noWrap
          >
            {product.title}
          </Typography>
        </Link>

        {/* Rating */}
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Rating value={parseFloat(product.rating)} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            ({product.reviewCount} {t('product.reviews')})
          </Typography>
        </Box>

        {/* Price */}
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
          {product.originalPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ${product.originalPrice}
            </Typography>
          )}
        </Box>

        {/* Add to Cart Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCart />}
          onClick={handleAddToCart}
          sx={{ mt: 'auto' }}
        >
          {t('product.addToCart')}
        </Button>
      </CardContent>
    </Card>
  );
}
