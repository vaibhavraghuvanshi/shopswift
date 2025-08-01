import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Badge,
  Box,
  styled,
  alpha,
  Button,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart,
  Favorite,
  Brightness4,
  Brightness7,
  Language,
  Store,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/theme/ThemeRegistry';
import { useCart } from '@/hooks/useCart';
import { useFavorites } from '@/hooks/useFavorites';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface AppBarProps {
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
}

export default function AppBar({ onSearchChange, searchQuery = '' }: AppBarProps) {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const [location] = useLocation();
  
  const { items: cartItems } = useCart();
  const { items: favoriteItems } = useFavorites();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favoriteItems.length;

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <MuiAppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo */}
        <Link href="/">
          <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
            <Store sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              ModernStore
            </Typography>
          </Box>
        </Link>

        {/* Search Bar - Desktop */}
        {!isMobile && (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: 4 }}>
            <Search sx={{ width: '100%', maxWidth: 400 }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={t('common.search')}
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </Search>
          </Box>
        )}

        {/* Action Buttons */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Language Toggle */}
          <Button
            color="inherit"
            size="small"
            onClick={toggleLanguage}
            startIcon={<Language />}
          >
            {i18n.language.toUpperCase()}
          </Button>

          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {/* Favorites */}
          <Link href="/favorites">
            <IconButton color="inherit">
              <Badge badgeContent={favoritesCount} color="secondary">
                <Favorite />
              </Badge>
            </IconButton>
          </Link>

          {/* Cart */}
          <Link href="/cart">
            <IconButton color="inherit">
              <Badge badgeContent={cartCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Search */}
      {isMobile && (
        <Box sx={{ px: 2, pb: 1 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('common.search')}
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              sx={{ width: '100%' }}
            />
          </Search>
        </Box>
      )}
    </MuiAppBar>
  );
}
