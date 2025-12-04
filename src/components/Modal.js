'use client';

import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import Button from '@/components/Button';
import './Modal.css';
import { Dialog } from "radix-ui";
import { Flex, TextField } from "@radix-ui/themes";
import Text from "@/components/Text";

export function WrapModal({ children, title, open, onClose }) {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose?.();
            }}
        >
            <Dialog.Portal>
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
            </Dialog.Portal>
        </Dialog.Root>
    );
}
