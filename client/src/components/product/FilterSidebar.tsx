import {
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Button,
  Rating,
  Radio,
  RadioGroup,
  Divider,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FilterState, CATEGORIES } from '@/types';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...localFilters.categories, category]
      : localFilters.categories.filter(c => c !== category);
    
    const newFilters = { ...localFilters, categories: newCategories };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (field: 'priceMin' | 'priceMax', value: string) => {
    const numValue = value === '' ? null : parseFloat(value);
    const newFilters = { ...localFilters, [field]: numValue };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (rating: number | null) => {
    const newFilters = { ...localFilters, rating };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterState = {
      categories: [],
      priceMin: null,
      priceMax: null,
      rating: null,
      sortBy: 'featured',
      searchQuery: localFilters.searchQuery,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <Paper sx={{ p: 3, position: 'sticky', top: 100 }}>
      <Typography variant="h6" gutterBottom>
        {t('filters.title')}
      </Typography>

      {/* Categories */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          {t('filters.categories')}
        </Typography>
        <FormGroup>
          {CATEGORIES.map((category) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox
                  checked={localFilters.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  size="small"
                />
              }
              label={t(`categories.${category}`)}
            />
          ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Price Range */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          {t('filters.priceRange')}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <TextField
            label="Min"
            type="number"
            size="small"
            value={localFilters.priceMin || ''}
            onChange={(e) => handlePriceChange('priceMin', e.target.value)}
            sx={{ flex: 1 }}
          />
          <Typography>-</Typography>
          <TextField
            label="Max"
            type="number"
            size="small"
            value={localFilters.priceMax || ''}
            onChange={(e) => handlePriceChange('priceMax', e.target.value)}
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Rating */}
      <Box mb={3}>
        <Typography variant="subtitle1" gutterBottom>
          {t('filters.rating')}
        </Typography>
        <RadioGroup
          value={localFilters.rating || ''}
          onChange={(e) => handleRatingChange(e.target.value ? parseFloat(e.target.value) : null)}
        >
          {[5, 4, 3, 2, 1].map((rating) => (
            <FormControlLabel
              key={rating}
              value={rating}
              control={<Radio size="small" />}
              label={
                <Box display="flex" alignItems="center" gap={0.5}>
                  <Rating value={rating} readOnly size="small" />
                  <Typography variant="body2">& up</Typography>
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Clear Filters */}
      <Button
        variant="outlined"
        fullWidth
        onClick={handleClearFilters}
        sx={{ mt: 2 }}
      >
        {t('filters.clearAll')}
      </Button>
    </Paper>
  );
}
