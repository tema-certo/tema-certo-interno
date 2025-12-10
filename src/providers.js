'use client';

import { createContext, useContext, useState } from 'react';

import { Toaster } from '@/components/ui/sonner';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ModalProvider } from 'react-modal-hook';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();


export function ClientProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                {children}
                <Toaster />
            </ModalProvider>
        </QueryClientProvider>
    );
}
