'use client';

import { useCallback, useEffect } from 'react';

import ButtonsRedirect from '@/app/interno/inicio/domains/ButtonsRedirect';
import { CardDataList } from '@/app/interno/inicio/domains/CardDataList';
import { MissionsCard } from '@/app/interno/inicio/domains/MissionsCard';
import { MostHighScoresRanking } from '@/app/interno/inicio/domains/MostHighScoresRanking';
import RecentsEssay from '@/app/interno/inicio/domains/RecentsEssay';
import TipMessage from '@/app/interno/inicio/domains/TipMessage';
import WelcomeUser from '@/app/interno/inicio/domains/WelcomeUser';
import { getUserData } from '@/app/login/login-helpers';
import Container from '@/components/Container';
import NavigationMenu from '@/components/NavigationMenu';
import Text from '@/components/Text';
import useStore from '@/hooks/useStore';
import { Separator } from '@radix-ui/themes/dist/esm';

import styles from './page.module.css';

export default function Page() {
    return (
        <main className={styles.mainContainer}>
            <Container>
                <WelcomeUser />
            </Container>

            <Separator my="2" size="4" />

            <Container>
                <div className={styles.mainGrid}>
                    <div className={styles.topActions}>
                        <ButtonsRedirect />
                    </div>

                    <div className={styles.statsAndTipGrid}>
                        <div className={styles.statsFlex}>
                            <div className={styles.statsRow}>
                                <CardDataList />
                            </div>
                            <RecentsEssay />
                            <RecentsEssay />
                        </div>
                        <div className={styles.tips}>
                            <MissionsCard />
                            <MostHighScoresRanking />
                            <TipMessage />
                        </div>

                    </div>

                </div>
            </Container>
        </main>

    );
}
