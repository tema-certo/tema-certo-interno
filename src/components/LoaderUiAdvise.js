import Container from '@/components/Container';
import Text from '@/components/Text';
import { Progress, Spinner } from '@radix-ui/themes';
import { Loader2Icon } from 'lucide-react';
import Loadable from 'next/dist/shared/lib/lazy-dynamic/loadable';

import styles from './LoaderUiAdvise.module.css';

export function LoadUiAdvise() {
    return (
        <main className={styles.loaderUiContainer}>
            <div className={styles.loaderUiContent}>
                <img
                    src="/tema-certo-black.svg"
                    alt="Logo do Tema Certo"
                    width={320}
                    height={320}
                    className={styles.logo}
                />
                <Text
                    text={'Acessando área interna...'}
                    as="h1"
                    size="6"
                    color="gray"
                    className={styles.textMessage}
                />
            </div>
        </main>
    );
}
