'use client';

import { useCallback } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import { useRouter } from 'next/navigation';

import styles from './not-found.module.css';

export default function Custom404() {
    const router = useRouter();

    const handleRedirect = useCallback(() => {
        if (window) {
            return () => window.history.back();
        }

        return () => router.push('/login');
    }, [router]);

    return (
        <main className={styles.containerNotFound}>
            <img
                src={'/tema-certo-black.svg'}
                width={200}
                height={200}
                alt={'Logo do Tema Certo'}
            />
            <Text
                text={'404 - Página não encontrada'}
                as={'h1'}
                size={'9'}
                isTitle
                mostBolder
            />
            <Button
                text={'Voltar para página anterior'}
                variant={'classic'}
                color={'blue'}
                size={'4'}
                radius={'medium'}
                onClick={handleRedirect()}
            />
        </main>
    );
}