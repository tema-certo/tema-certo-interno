'use client';

import { useCallback, useMemo, useState } from 'react';

import CheckoutEmbedded from '@/app/interno/planos/domains/CheckoutEmbedded';
import colors from '@/colors';
import Button from '@/components/Button';
import Card from '@/components/Card';
import List from '@/components/List';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { dismissLoadingToast } from '@/helpers';
import useApi from '@/hooks/useApi';
import useClassnames from '@/hooks/useClassnames';
import useStore from '@/hooks/useStore';
import { RocketIcon } from '@radix-ui/react-icons';
import { BookCheck, BrickWallFireIcon, InfinityIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

import styles from './CardPlan.module.css';

const PLAN_ORDER = ['FREE', 'PRO', 'BASIC'];
const PLAN_UI_MAP = {
    FREE: {
        title: 'Plano Gratuito',
        subtitle: 'Plano gratuito e limitado',
        benefits: [
            'Acesso à correção de redações',
            'Até 5 redações por mês',
            'Feedback detalhado e personalizado',
            'Sugestões de melhorias otimizadas',
            'Análise avançada de competências',
        ],
        style: 'gray',
        icon: <BookCheck width={20} height={20} color={colors['color-title-blue']} />,
        preferred: false,
        goodBenefit: false,
        cta: null,
    },

    BASIC: {
        title: 'Plano Básico',
        subtitle: 'Para quem quer resultados rápidos',
        reachablePrice: 'R$ 49,90',
        benefits: [
            'Acesso amplificado à correção de redações',
            'Até 15 redações por mês',
            'Feedback detalhado e personalizado',
            'Sugestões de melhorias otimizadas',
            'Análise avançada de competências',
            'Suporte prioritário',
        ],
        style: 'gray',
        icon: <BrickWallFireIcon width={20} height={20} color={colors['color-title-blue']} />,
        preferred: false,
        goodBenefit: true,
        cta: {
            text: 'Quero esse!',
            color: 'blue',
        },
    },

    PRO: {
        title: 'Plano Pro!',
        subtitle: 'Para máxima preparação e para sair na frente!',
        reachablePrice: 'R$ 79,90',
        benefits: [
            'Até 50 redações por mês',
            'Pratique sem medo até dominar cada competência',
            'Analise redações com as melhores notas',
            'Sistema de streak para manter o foco',
            'Feedback detalhado e personalizado',
            'Acesso a conteúdos exclusivos',
            'Suporte prioritário',
        ],
        style: 'gold',
        icon: <RocketIcon width={20} height={20} color={colors['color-gold-winner']} />,
        preferred: true,
        goodBenefit: false,
        cta: {
            text: 'Quero esse!',
            color: 'yellow',
        },
    },
};

const HtmlCardsGeneric = ({
    subTitle,
    price,
    essaysPerMonth,
    listBenefits,
    yellowCard,
    reachablePrice,
    button,
}) => {
    const essayCardColor = useClassnames([
        styles.containerEssaysPerMonth,
        yellowCard && styles.yellowCard,
    ]);

    return (
        <div>
            <div>
                <Text
                    text={subTitle}
                    size={'2'}
                    color={'gray'}
                />
            </div>
            <div className={styles.containerPrice}>
                {reachablePrice && (
                    <s>
                        <Text
                            text={reachablePrice}
                            size={'4'}
                            mostBolder
                        />
                    </s>
                )}
                <div>
                    <Text
                        text={price}
                        size={'8'}
                        mostBolder
                    />
                    {price !== 'Grátis' && (
                        <Text
                            text={'/Por mês'}
                            size={'1'}
                            color={'gray'}
                        />
                    )}
                </div>
            </div>
            <div className={essayCardColor}>
                <Text
                    text={essaysPerMonth}
                    size={'6'}
                    bold
                />
                <Text
                    text={'redações por mês'}
                    size={'2'}
                    color={'gray'}
                />
            </div>
            <div className={styles.containerListBenefits}>
                <List
                    items={listBenefits}
                    useCheckmark
                />
            </div>
            {button && (
                <div className={styles.containerButton}>
                    {button}
                </div>
            )}
        </div>
    );
};

export default function CardPlan() {
    const api = useApi({ url: envs.PAYMENTS_API_URL });
    const router = useRouter();
    const setUserSessionSubscribe = useStore(state => state.setUserSessionSubscribe);

    const { data: possiblePlans } = useQuery({
        queryKey: 'possiblePlans',
        queryFn: async () => {
            return await api.get('/possible-client-plans');
        },
        refetchOnMount: true,
        staleTime: Infinity,
    });

    const { mutateAsync: callSubscribePlan, isLoading: isSubscribing } = useMutation({
        mutationFn: async (value) => {
            const toastId = toast.loading('Criando sessão de checkout...');

            try {
                const { data } = await api.post('/create-checkout-session', {
                    product_identifier: value,
                });

                dismissLoadingToast({
                    toastId,
                    type: 'success',
                    message: 'Sucesso! Vamos te redirecionar para o checkout.',
                });

                return data;
            } catch (e) {
                dismissLoadingToast({
                    toastId,
                    type: 'error',
                    message: 'Erro ao criar sessão de checkout. Tente novamente mais tarde ou entre em contato com o suporte.',
                });
            }
        },
    });

    const handleSubscribe = useCallback((value) => {
        return async () => {
            const data = await callSubscribePlan(value);

            setUserSessionSubscribe({
                clientSecret: data.client_secret,
            });

            router.push('/interno/checkout');
        };
    }, [callSubscribePlan, router, setUserSessionSubscribe]);

    const setupCards = useMemo(() => {
        if (!possiblePlans?.data) return [];

        return [...possiblePlans?.data]
            .sort((a, b) => {
                return PLAN_ORDER.indexOf(a.plan_name) - PLAN_ORDER.indexOf(b.plan_name);
            })
            .map((plan) => {
                const uiConfig = PLAN_UI_MAP[plan.plan_name];
                if (!uiConfig) return null;

                const button = uiConfig.cta ? (
                    <Button
                        text={uiConfig.cta.text}
                        variant="classic"
                        color={uiConfig.cta.color}
                        icon={uiConfig.preferred ? <RocketIcon width={16} height={16} /> : undefined}
                        position="right"
                        animatedicon
                        className={styles.btn}
                        onClick={handleSubscribe(plan.secure_identifier)}
                        size="4"
                        loading={isSubscribing}
                        key={plan.plan_name}
                    />
                ) : null;

                return {
                    title: uiConfig.title,
                    styleDefinition: uiConfig.style,
                    preferred: uiConfig.preferred,
                    goodBenefit: uiConfig.goodBenefit,
                    icon: uiConfig.icon,
                    html: (
                        <HtmlCardsGeneric
                            subTitle={uiConfig.subtitle}
                            price={plan.plan_ui_price}
                            essaysPerMonth={plan.essays_per_month}
                            listBenefits={uiConfig.benefits}
                            yellowCard={uiConfig.preferred}
                            reachablePrice={uiConfig.reachablePrice}
                            button={button}
                        />
                    ),
                };
            })
            .filter(Boolean);
    }, [handleSubscribe, isSubscribing, possiblePlans?.data]);

    const renderCards = useCallback(() => {
        return setupCards.map((item) => {
            const className = [
                styles.defaultCard,
                styles[item.styleDefinition],
                item.preferred && styles.preferred,
            ]
                .filter(Boolean)
                .join(' ');

            return (
                <div
                    className={`${styles.cardWrapper} ${
                        item.preferred ? styles.preferredWrapper : ''
                    }`}
                    key={item.title}
                >
                    {item.preferred && (
                        <span className={styles.badge}>MAIS ESCOLHIDO 🏆</span>
                    )}

                    {item.goodBenefit && (
                        <span className={styles.badgeBenefit}>Mais acessível</span>
                    )}

                    <Card
                        title={item.title}
                        html={item.html}
                        maxW={'480px'}
                        minW={'360px'}
                        icon={item.icon}
                        noBorder
                        iconClassName={styles.setupIcon}
                        titleSize="6"
                        className={className}
                        noShadow
                    />
                </div>
            );
        });
    }, [setupCards]);

    return (
        <div className={styles.containerCards}>
            {renderCards()}
        </div>
    );
}
