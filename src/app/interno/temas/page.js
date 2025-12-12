'use client';

import ListThemes from '@/app/interno/temas/domains/ListThemes';
import ThemesHeader from '@/app/interno/temas/domains/ThemesHeader';
import Container from '@/components/Container';
import NavigationMenu from '@/components/NavigationMenu';
import { Separator } from '@radix-ui/themes/dist/esm';

export default function Page() {
    return (
        <main>
            <Container>
                <ThemesHeader/>
            </Container>
            <Separator my="4" size="4" />
            <Container>
                <ListThemes/>
            </Container>
        </main>
    );
}
