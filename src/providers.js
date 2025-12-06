'use client';

import { createContext, useContext, useState } from 'react';

import { Toaster } from '@/components/ui/sonner';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ModalProvider } from 'react-modal-hook';

export function ClientProviders({ children }) {
    return (
        <ModalProvider>
            {children}
            <Toaster />
        </ModalProvider>
    );
}
