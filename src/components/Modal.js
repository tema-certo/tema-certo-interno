'use client';

import React, { useCallback, useState } from 'react';

import Button from '@/components/Button';
import './Modal.css';
import Text from '@/components/Text';
import { Flex, TextField, Theme } from '@radix-ui/themes';
import { Dialog } from 'radix-ui';
import { useForm } from 'react-hook-form';

export function     WrapModal({ children, title, open, onClose }) {

    const validateOpenChange = useCallback((isOpen) => {
        if (!isOpen) onClose?.();
    }, [onClose]);

    return (
        <Dialog.Root
            open={open}
            onOpenChange={validateOpenChange}
        >
            <Dialog.Portal>
                <Theme>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                        {title && <Dialog.Title className="DialogTitle">{title}</Dialog.Title>}

                        {typeof children === 'function'
                            ? children({ closeModal: onClose })
                            : children
                        }

                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">✕</button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Theme>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
