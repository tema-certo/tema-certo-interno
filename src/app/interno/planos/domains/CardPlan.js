import { useCallback, useMemo } from 'react';

import colors from '@/colors';
import Button from '@/components/Button';
import Card from '@/components/Card';
import List from '@/components/List';
import Text from '@/components/Text';
import useClassnames from '@/hooks/useClassnames';
import { RocketIcon } from '@radix-ui/react-icons';
import { BookCheck, BrickWallFireIcon, InfinityIcon } from 'lucide-react';

import styles from './CardPlan.module.css';

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
    const freeBenefits = useMemo(() => {
        return [
            'Acesso limitado à correção de redações',
            'Apenas 5 redações por mês',
            'Feedback pouco detalhado',
            'Sugestões de melhorias básicas',
        ];
    }, []);

    const basicBenefits = useMemo(() => {
        return [
            'Acesso amplificado à correção de redações',
            'Até 15 redações por mês',
            'Feedback detalhado e personalizado',
            'Sugestões de melhorias otimizadas',
            'Análise avançada de competências',
            'Suporte prioritário',
        ];
    }, []);

    const proBenefits = useMemo(() => {
        return [
            'Quantidade alta de redações por mês',
            'Até 50 redações por mês',
            'Pratique sem medo até dominar cada competência',
            'Analise as redações com as melhores notas de outros alunos',
            'Feedback detalhado e personalizado',
            'Sistema de streak para manter o foco (ofensiva)',
            'Sugestões de melhorias otimizadas',
            'Descubra exatamente onde você perde pontos e como recuperá-los',
            'Suporte prioritário',
            'Acesso a conteúdos exclusivos',
        ];
    }, []);

    // TODO: Adicionar funções para redirecionar para o checkout. Utilizaremos Stripe;

    const setupCards = useMemo(() => [
        {
            title: 'Plano gratuito',
            html: <HtmlCardsGeneric
                subTitle={'Plano gratuito e limitado'}
                price={'Grátis'}
                essaysPerMonth={5}
                listBenefits={freeBenefits}
            />,
            styleDefinition: 'gray',
            icon: <BookCheck width={20} height={20} color={colors['color-title-blue']} />,
        },
        {
            title: 'Plano Pro!',
            html: <HtmlCardsGeneric
                subTitle={'Para máxima preparação e para sair na frente!'}
                reachablePrice={'R$ 79,90'}
                price={'R$ 55,90'}
                essaysPerMonth={50}
                listBenefits={proBenefits}
                yellowCard
                button={<Button
                    text={'Quero esse!'}
                    variant={'classic'}
                    color={'yellow'}
                    icon={<RocketIcon width={16} height={16} />}
                    position={'right'}
                    animatedicon
                    className={styles.btn}
                    size={'4'}
                />}
            />,
            styleDefinition: 'gold',
            icon: <RocketIcon width={20} height={20} color={colors['color-gold-winner']} />,
            preferred: true,
        },
        {
            title: 'Plano básico',
            html: <HtmlCardsGeneric
                subTitle={'Para quem quer resultados rápidos'}
                reachablePrice={'R$ 39,90'}
                price={'R$ 29,90'}
                essaysPerMonth={15}
                listBenefits={basicBenefits}
                button={<Button
                    text={'Quero esse!'}
                    variant={'classic'}
                    color={'blue'}
                    position={'right'}
                    animatedicon
                    className={styles.btn}
                    size={'4'}
                />}
            />,
            styleDefinition: 'gray',
            icon: <BrickWallFireIcon width={20} height={20} color={colors['color-title-blue']} />,
            goodBenefit: true,
        },
    ], [freeBenefits, proBenefits, basicBenefits]);

    const renderCards = useCallback(() => {
        return setupCards.map((item) => {
            const className = [
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
