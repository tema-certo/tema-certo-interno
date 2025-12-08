'use client';

import { useCallback, useEffect } from 'react';

import ButtonsRedirect from '@/app/interno/inicio/domains/ButtonsRedirect';
import WelcomeUser from '@/app/interno/inicio/domains/WelcomeUser';
import { getUserData } from '@/app/login/login-helpers';
import Container from '@/components/Container';
import NavigationMenu from '@/components/NavigationMenu';
import Text from '@/components/Text';
import { Separator } from '@radix-ui/themes/dist/esm';

export default function Page() {

    return (
        <main>
            <Container>
                <WelcomeUser/>
            </Container>
            <Separator my="2" size='4' />
            <Container>
                <ButtonsRedirect/>
            </Container>
        </main>
    );
}
