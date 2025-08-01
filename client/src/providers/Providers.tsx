import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';
import { store } from '@/store';
import { queryClient } from '@/lib/queryClient';
import ThemeRegistry from '@/theme/ThemeRegistry';
import '@/i18n';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeRegistry>
          <SnackbarProvider 
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            autoHideDuration={3000}
          >
            {children}
          </SnackbarProvider>
        </ThemeRegistry>
      </QueryClientProvider>
    </Provider>
  );
}
