import { Grid } from '@mui/material';
import { Product } from '@shared/schema';
import ProductCard from './ProductCard';
import LoadingSkeleton from '@/components/common/LoadingSkeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return <LoadingSkeleton variant="product" count={8} />;
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
