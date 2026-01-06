'use client';

import { useCallback } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './InitialHeader.module.css';

export default function InitialHeader() {
    const router = useRouter();

    const handleRollback = useCallback(() => {
        if (window) {
            return window.history.back();
        }

        return router.push('/interno/inicio');
    }, [router]);

    return (
        <div className={styles.containerHeaderDefault}>
            <Button
                text={<ArrowLeftIcon width={24} height={24} />}
                variant={'ghost'}
                color={'gray'}
                size={'3'}
                radius={'large'}
                onClick={handleRollback}
                classnames={styles.buttonBack}
            />
            <div className={styles.containerHeader}>
                <Text
                    isTitle
                    text={'Meu perfil'}
                    as={'h1'}
                    size={'9'}
                />
                <Text
                    text={'Gerencie suas informações'}
                    as={'p'}
                    size={'4'}
                    color={'gray'}
                />
            </div>
        </div>
    );
}
