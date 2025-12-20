'use client';

import Filters from '@/app/interno/temas/domains/Filters';
import ListThemes from '@/app/interno/temas/domains/ListThemes';
import ThemesHeader from '@/app/interno/temas/domains/ThemesHeader';
import Container from '@/components/Container';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@radix-ui/themes/dist/esm';

import styles from './page.module.css';

export default function Page() {
    return (
        <main>
            <Container>
                <ThemesHeader/>
            </Container>
            <Separator my="2" size="4" />
            <Container>
                <div className={styles.containerEssaysCards}>
                    <ListThemes/>
                </div>
            </Container>
        </main>
    );
}
