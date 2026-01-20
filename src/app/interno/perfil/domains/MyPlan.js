'use client';

import { useCallback } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import List from '@/components/List';
import Text from '@/components/Text';
import { conversorPlanInfo } from '@/helpers';
import useSize from '@/hooks/useSize';
import useStore from '@/hooks/useStore';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

import styles from './MyPlan.module.css';

export default function MyPlan() {
    const { permissions } = useStore(state => state.user);
    const { isMobile, isTablet, isLowerMobile } = useSize();
    const router = useRouter();

    const findPlanName = useCallback(() => {
        return conversorPlanInfo(permissions?.role_name);
    }, [permissions?.role_name]);

    const isFreePlan = findPlanName()?.label === 'Gratuito';
    const isBasicPlan = findPlanName()?.label === 'Básico';
    const isProPlan = findPlanName()?.label === 'Pro!';

    const handleGoToPlans = useCallback(() => {
        return () => router.push('/interno/planos');
    }, [router]);

    const GenericButtonsPaidPlans = useCallback(() => {
        return (
            <div className={styles.buttonsContainer}>
                {(isFreePlan || isBasicPlan) && (
                    <Button
                        text={isMobile || isLowerMobile ? 'Explorar planos' : 'Explorar planos disponíveis'}
                        variant={'classic'}
                        color={'blue'}
                        size={'4'}
                        radius={'medium'}
                        className={styles.ctaButton}
                        icon={<ArrowRightIcon width={16} height={16} />}
                        position={'right'}
                        animatedicon={true}
                        onClick={handleGoToPlans()}
                    />
                )}
                {!isFreePlan && (
                    <Button
                        text={'Gerenciar assinatura'}
                        variant={'outline'}
                        color={'red'}
                        size={'2'}
                        radius={'medium'}
                        className={styles.ctaButton}
                    />
                )}
            </div>
        );
    }, [handleGoToPlans, isBasicPlan, isFreePlan, isLowerMobile, isMobile]);

    const switchImageState = useCallback(() => {
        if (isFreePlan) {
            return '/images/fatal-error.svg';
        }

        if (isBasicPlan) {
            return '/images/logged_out.svg';
        }

        if (isProPlan) {
            return '/images/education-2.svg';
        }

        return '/images/fatal-error.svg';
    }, [isBasicPlan, isFreePlan, isProPlan]);

    const CardHtml = useCallback(() => {
        return (
            <div className={styles.containerCardHtml}>
                <div className={styles.containerList}>
                    <div className={styles.benefitsSection}>
                        <List
                            items={findPlanName()?.benefits}
                            useCheckmark
                            title={'O que você tem hoje'}
                        />
                    </div>

                    {isFreePlan && (
                        <>
                            <div className={styles.upgradePrompt}>
                                <div className={styles.upgradeText}>
                                    <Text
                                        text={'Você está aproveitando o mínimo. Mas e se pudesse fazer mais?'}
                                        size={'3'}
                                        mostBolder
                                        color={'dark-blue'}
                                    />
                                    <Text
                                        text={'Milhares de usuários já desbloquearam recursos que transformam resultados. Descubra o que está perdendo.'}
                                        size={'2'}
                                        color={'gray'}
                                    />
                                </div>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>3x</span>
                                        <span className={styles.statLabel}>Mais rápido</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>89%</span>
                                        <span className={styles.statLabel}>Satisfação</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>24/7</span>
                                        <span className={styles.statLabel}>Suporte</span>
                                    </div>
                                </div>
                                <GenericButtonsPaidPlans />
                            </div>
                        </>
                    )}

                    {isBasicPlan && (
                        <>
                            <div className={styles.upgradePrompt}>
                                <div className={styles.upgradeText}>
                                    <Text
                                        text={'Você está aproveitando o básico. Mas e se pudesse fazer mais?'}
                                        size={'3'}
                                        mostBolder
                                        color={'dark-blue'}
                                    />
                                    <Text
                                        text={'Desbloqueie recursos avançados e tenha uma experiência mais personalizada.'}
                                        size={'2'}
                                        color={'gray'}
                                    />
                                </div>
                                <div className={styles.statsGrid}>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>3x</span>
                                        <span className={styles.statLabel}>Mais rápido</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>89%</span>
                                        <span className={styles.statLabel}>Satisfação</span>
                                    </div>
                                    <div className={styles.statItem}>
                                        <span className={styles.statNumber}>24/7</span>
                                        <span className={styles.statLabel}>Suporte</span>
                                    </div>
                                </div>
                                <GenericButtonsPaidPlans />
                            </div>
                        </>
                    )}

                    {isProPlan && (
                        <>
                            <div className={styles.upgradePrompt}>
                                <div className={styles.upgradeText}>
                                    <Text
                                        text={'Você está voando!'}
                                        size={'3'}
                                        mostBolder
                                        color={'dark-blue'}
                                    />
                                    <Text
                                        text={'Obrigado por estar conosco. Você está no caminho certo rumo à aprovação.'}
                                        size={'2'}
                                        color={'gray'}
                                    />
                                </div>
                                <GenericButtonsPaidPlans />
                            </div>
                        </>
                    )}
                </div>


                <div className={styles.image}>
                    <img src={switchImageState()} alt="Imagem do plano" />
                </div>
            </div>
        );
    }, [switchImageState, findPlanName, isBasicPlan, isFreePlan, isProPlan]);

    return (
        <div className={styles.containerMyPlan}>
            <div>
                <Card
                    title={`Plano - ${findPlanName()?.label}`}
                    html={<CardHtml />}
                    noBorder
                />
            </div>
        </div>
    );
}