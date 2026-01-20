'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { ModalProvider } from 'react-modal-hook';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export function ClientProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                {children}
            </ModalProvider>
        </QueryClientProvider>
    );
}
