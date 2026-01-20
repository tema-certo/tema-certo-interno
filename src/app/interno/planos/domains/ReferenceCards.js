import { useCallback, useMemo } from 'react';

import colors from '@/colors';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons';

import styles from './ReferenceCards.module.css';

export default function ReferenceCards() {

    const starHtml = useCallback(() => {
        return Array.from({ length: 5 }, (_, index) => (
            <div key={index} className={styles.starContainer}>
                <StarFilledIcon width={16} height={16} color={colors['color-yellow-default']}/>
            </div>
        ));
    }, []);

    const cardsData = useMemo(() => {
        return [
            {
                text: '"Melhorei 200 pontos em 2 meses!"',
                name: 'Maria Aparecida',
                note: 920,
            },
            {
                text: '"Agora eu sei o que fazer para melhorar!"',
                name: 'João Pedro',
                note: 850,
            },
            {
                text: '"Consegui a nota máxima!"',
                name: 'Ana Clara V.',
                note: 1000,
            },
        ];
    }, []);

    const renderCardHtml = useCallback(() => {
        return cardsData.map((item, index) => {
            const cardHtml = () => {
                return (
                    <div>
                        <div>
                            <div className={styles.containerQuote}>
                                {starHtml()}
                            </div>
                        </div>
                        <i>
                            <Text
                                text={item.text}
                                size={'4'}
                                color={'black'}
                                classNames={styles.textCard}
	                       />
                        </i>
                        <div className={styles.containerInfo}>
                            <Text
                                text={item.name}
                                size={'2'}
                                color={'gray'}
		                    />
                            <Badge
                                text={`Nota: ${item.note}`}
                                size={'2'}
                                color={'green'}
                                radius={'full'}
                                variant={'surface'}
		                    />
                        </div>
                    </div>
                );
            };

            return (
                <div
                    key={index}
                >
                    <Card
                        html={cardHtml()}
                        noBorder
	                />
                </div>
            );
        });
    }, [cardsData, starHtml]);

    return (
        <div className={styles.containerReferenceCards}>
            <div className={styles.containerTitle}>
                <Text
                    text={'Quem usa, '}
                    size={'7'}
                    isTitle
                />
                <Text
                    text={'conquista'}
                    size={'7'}
                    isTitle
                    color={'blue'}
                />
            </div>
            <div
                className={styles.containerCards}
            >
                {renderCardHtml()}
            </div>

            <div className={styles.containerGarantia}>
                <Text
                    text={'GARANTIA INCONDICIONAL DE 7 DIAS'}
                    size={'4'}
                    mostBolder
                    as={'p'}
                />

                <Text
                    text={'Experimente sem risco. Se não gostar, devolvemos 100% do seu dinheiro. Sem perguntas, sem' +
                        ' burocracia.'}
                    size={'4'}
                    color={'gray'}
                    as={'p'}
                />
            </div>
        </div>
    );
}
