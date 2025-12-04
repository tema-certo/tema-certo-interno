'use client';

import { ModalProvider } from 'react-modal-hook';

export function ClientProviders({ children }) {
    return (
        <ModalProvider>
            {children}
        </ModalProvider>
    );
}
