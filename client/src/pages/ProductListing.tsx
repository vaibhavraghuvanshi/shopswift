import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { GridView, ViewList } from '@mui/icons-material';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';
import { FilterState, SORT_OPTIONS } from '@/types';
import { Product } from '@shared/schema';

interface ProductListingProps {
  searchQuery: string;
}

export default function ProductListing({ searchQuery }: ProductListingProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const { data: products = [], isLoading } = useProducts();
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceMin: null,
    priceMax: null,
    rating: null,
    sortBy: 'featured',
    searchQuery: '',
  });
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }

    // Price filter
    if (filters.priceMin !== null) {
      filtered = filtered.filter(product => parseFloat(product.price) >= filters.priceMin!);
    }
    if (filters.priceMax !== null) {
      filtered = filtered.filter(product => parseFloat(product.price) <= filters.priceMax!);
    }

    // Rating filter
    if (filters.rating !== null) {
      filtered = filtered.filter(product => parseFloat(product.rating) >= filters.rating!);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-desc':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'rating':
        filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [products, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = Math.min(page * itemsPerPage, filteredProducts.length);

  return (
    <Box>
      {/* Page Header */}
      <Box mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Discover Amazing Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Find the perfect items for your needs
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Filters Sidebar */}
        {!isMobile && (
          <Grid item lg={3}>
            <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
          </Grid>
        )}

        {/* Main Content */}
        <Grid item xs={12} lg={9}>
          {/* Sort and View Options */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="body2" color="text.secondary">
              {t('filters.showing', {
                start: startIndex,
                end: endIndex,
                total: filteredProducts.length,
              })}
            </Typography>

            <Box display="flex" alignItems="center" gap={2}>
              {/* Sort Dropdown */}
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={filters.sortBy}
                  onChange={(e) =>
                    handleFiltersChange({
                      ...filters,
                      sortBy: e.target.value as FilterState['sortBy'],
                    })
                  }
                >
                  <MenuItem value="featured">
                    {t('filters.sortBy')}: {t('filters.featured')}
                  </MenuItem>
                  <MenuItem value="price-asc">
                    {t('filters.sortBy')}: {t('filters.priceAsc')}
                  </MenuItem>
                  <MenuItem value="price-desc">
                    {t('filters.sortBy')}: {t('filters.priceDesc')}
                  </MenuItem>
                  <MenuItem value="rating">
                    {t('filters.sortBy')}: {t('filters.ratingSort')}
                  </MenuItem>
                  <MenuItem value="newest">
                    {t('filters.sortBy')}: {t('filters.newest')}
                  </MenuItem>
                </Select>
              </FormControl>

              {/* View Toggle */}
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(_, newView) => newView && setViewMode(newView)}
                size="small"
              >
                <ToggleButton value="grid">
                  <GridView />
                </ToggleButton>
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>

          {/* Products */}
          {isLoading ? (
            <LoadingSkeleton variant="product" count={8} />
          ) : (
            <ProductGrid products={paginatedProducts} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
