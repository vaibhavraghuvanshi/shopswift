import { Skeleton, Card, CardContent, Box, Grid } from '@mui/material';

interface LoadingSkeletonProps {
  variant?: 'product' | 'list' | 'detail';
  count?: number;
}

export default function LoadingSkeleton({ variant = 'product', count = 8 }: LoadingSkeletonProps) {
  if (variant === 'product') {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
          </Grid>
        ))}
      </Grid>
    );
  }

  if (variant === 'list') {
    return (
      <Box>
        {Array.from({ length: count }).map((_, index) => (
          <Box key={index} display="flex" gap={2} mb={2} p={2}>
            <Skeleton variant="rectangular" width={100} height={100} />
            <Box flex={1}>
              <Skeleton variant="text" height={24} width="60%" />
              <Skeleton variant="text" height={20} width="40%" />
              <Skeleton variant="text" height={16} width="80%" />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (variant === 'detail') {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rectangular" height={400} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="text" height={32} width="80%" />
          <Skeleton variant="text" height={24} width="60%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="100%" />
          <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
          <Box display="flex" gap={2}>
            <Skeleton variant="rectangular" width={120} height={36} />
            <Skeleton variant="rectangular" width={100} height={36} />
          </Box>
        </Grid>
      </Grid>
    );
  }

  return null;
}
