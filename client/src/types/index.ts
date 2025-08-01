export interface FilterState {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  rating: number | null;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}

export interface PaginationState {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Shoes',
  'Beauty',
  'Sports',
  'Accessories',
  'Furniture',
] as const;

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Customer Rating' },
  { value: 'newest', label: 'Newest' },
] as const;
