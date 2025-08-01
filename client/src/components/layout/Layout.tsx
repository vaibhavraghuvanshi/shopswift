import { ReactNode } from 'react';
import { Box, Container, Fab, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'wouter';
import AppBar from './AppBar';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: ReactNode;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function Layout({ children, onSearchChange, searchQuery }: LayoutProps) {
  const isMobile = useIsMobile();
  const { items: cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar onSearchChange={onSearchChange} searchQuery={searchQuery} />
      
      <Container maxWidth="xl" sx={{ flex: 1, py: 3 }}>
        {children}
      </Container>

      {/* Floating Cart Button - Mobile */}
      {isMobile && (
        <Link href="/cart">
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
          >
            <Badge badgeContent={cartCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </Fab>
        </Link>
      )}
    </Box>
  );
}
