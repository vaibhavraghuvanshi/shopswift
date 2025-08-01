import {
  Box,
  Typography,
  Grid,
  Button,
  IconButton,
  Rating,
  Chip,
  Paper,
  Divider,
  TextField,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Add,
  Remove,
} from '@mui/icons-material';
import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useProduct(id!);
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading || !product) {
    return <LoadingSkeleton variant="detail" />;
  }

  const isProductFavorite = isFavorite(product.id);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity,
    });
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/">
          <MuiLink component="span" underline="hover" color="inherit">
            Home
          </MuiLink>
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={product.image}
            alt={product.title}
            sx={{
              width: '100%',
              height: { xs: 300, md: 500 },
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            {/* Badge */}
            {product.badge && (
              <Chip
                label={product.badge}
                color={product.isOnSale ? 'secondary' : 'primary'}
                sx={{ mb: 2 }}
              />
            )}

            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>

            {/* Rating */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Rating value={parseFloat(product.rating)} precision={0.1} readOnly />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount} {t('product.reviews')})
              </Typography>
            </Box>

            {/* Price */}
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                ${product.price}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.originalPrice}
                </Typography>
              )}
            </Box>

            {/* Category */}
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>{t('product.category')}:</strong> {product.category}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Description */}
            <Typography variant="h6" gutterBottom>
              {t('product.description')}
            </Typography>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {/* Quantity and Actions */}
            <Paper variant="outlined" sx={{ p: 3 }}>
              {/* Quantity Selector */}
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Typography variant="body1">{t('cart.quantity')}:</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Remove />
                  </IconButton>
                  <TextField
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    size="small"
                    sx={{ width: 80 }}
                    inputProps={{ min: 1, style: { textAlign: 'center' } }}
                  />
                  <IconButton onClick={() => handleQuantityChange(1)}>
                    <Add />
                  </IconButton>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box display="flex" gap={2} flexWrap="wrap">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ flex: 1, minWidth: 200 }}
                >
                  {t('product.addToCart')}
                </Button>
                
                <IconButton
                  size="large"
                  onClick={handleToggleFavorite}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  {isProductFavorite ? (
                    <Favorite color="secondary" />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
