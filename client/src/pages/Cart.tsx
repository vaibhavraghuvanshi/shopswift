import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
  Button,
  TextField,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Alert,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  ShoppingCartCheckout,
} from '@mui/icons-material';
import { Link } from 'wouter';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/hooks/useCart';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

export default function Cart() {
  const { t } = useTranslation();
  const { items, total, isLoading, updateQuantity, removeFromCart, clearCart } = useCart();

  if (isLoading) {
    return <LoadingSkeleton variant="list" count={3} />;
  }

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h4" gutterBottom>
          {t('cart.title')}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {t('cart.empty')}
        </Typography>
        <Link href="/">
          <Button variant="contained" sx={{ mt: 2 }}>
            Continue Shopping
          </Button>
        </Link>
      </Box>
    );
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('cart.title')}
      </Typography>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Box display="flex" flexDirection="column" gap={2}>
            {items.map((item) => (
              <Card key={item.id} variant="outlined">
                <Box display="flex" p={2}>
                  {/* Product Image */}
                  <Link href={`/products/${item.product.id}`}>
                    <CardMedia
                      component="img"
                      sx={{ width: 120, height: 120, borderRadius: 1, cursor: 'pointer' }}
                      image={item.product.image}
                      alt={item.product.title}
                    />
                  </Link>

                  {/* Product Details */}
                  <CardContent sx={{ flex: 1 }}>
                    <Link href={`/products/${item.product.id}`}>
                      <Typography
                        variant="h6"
                        sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                      >
                        {item.product.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.product.category}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      ${item.product.price}
                    </Typography>
                  </CardContent>

                  {/* Quantity Controls */}
                  <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.productId, parseInt(e.target.value) || 1)
                        }
                        size="small"
                        sx={{ width: 60 }}
                        inputProps={{ min: 1, style: { textAlign: 'center' } }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>

          {/* Clear Cart */}
          <Box mt={2}>
            <Button variant="outlined" color="error" onClick={clearCart}>
              Clear Cart
            </Button>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>

            <Box mb={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>{t('cart.subtotal')}</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Tax</Typography>
                <Typography>${(total * 0.1).toFixed(2)}</Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" mb={3}>
              <Typography variant="h6">{t('cart.total')}</Typography>
              <Typography variant="h6" color="primary" fontWeight="bold">
                ${(total * 1.1).toFixed(2)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartCheckout />}
            >
              {t('cart.checkout')}
            </Button>

            <Alert severity="info" sx={{ mt: 2 }}>
              Free shipping on orders over $50
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
