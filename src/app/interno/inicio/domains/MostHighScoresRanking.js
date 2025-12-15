import { useCallback } from 'react';

import colors from '@/colors';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { WrapModal } from '@/components/Modal';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { BadgeColorStyle, SplitLargeText } from '@/helpers';
import useApi from '@/hooks/useApi';
import useSelector from '@/hooks/useEssaySelector';
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { Separator } from '@radix-ui/themes/dist/esm';
import { CrownIcon } from 'lucide-react';
import { useQuery } from 'react-query';

import styles from './MostHighScoresRanking.module.css';


export function MostHighScoresRanking() {
    const { value, clearSelect, onSelect } = useSelector();
    const api = useApi({ url: envs.API_URL });

    const {
        data: ranking,
	    isLoading,
    } = useQuery({
        queryKey: 'ranking',
        queryFn: async () => {
            return await api.get('/most-high-scores');
        },
        refetchOnMount: true,
        suspense: true,
    });

    const handleClick = useCallback(() => {
        return () => onSelect(true);
    }, [onSelect]);

    const CardHtml = useCallback(() => {
        let rankingList = ranking?.data ?? [];
        let olderRanking;
        const haveBetterThan4 = rankingList.length > 4;

        if (haveBetterThan4) {
            olderRanking = rankingList;
            rankingList = rankingList.slice(0, 4);
        }

        if (isLoading) {
            return <Text text={'Carregando...'} size={'3'} color={'gray'} />;
        }

        if (!rankingList.length) {
            return (
                <div>
                    Ranking zerado. Seja o primeiro da lista!
                </div>
            );
        }

        return (
            <div>
                {rankingList.map((item, index) => (
                    <div key={index} className={styles.rankingItem}>
                        <div className={styles.rankingItemSelectors}>
                            <div className={styles.nameAndIcon}>
                                <Text
                                    text={item?.name}
                                    size={'3'}
                                    bold
                                    icon={<PersonIcon color={colors['color-gray-common']}/>}
                                />
                                <Text
                                    size={'1'}
                                    color={'gray'}
                                >
                                    {SplitLargeText(item?.theme_title, 30)}
                                </Text>
                            </div>
                            <div>
                                <Badge
                                    text={item?.score}
                                    variant={'surface'}
                                    radius={'full'}
                                    size={'2'}
                                    color={BadgeColorStyle(item?.score)}
                                />
                            </div>
                        </div>
                        <Separator
                            my="0"
                            size="2"
                            color={'orange'}
                            className={styles.separator}
                        />
                    </div>
                ))}
                {haveBetterThan4 && (
                    <div className={styles.seeAll}>
                        <Button
                            text={'Ver todas'}
                            icon={<ArrowRightIcon/>}
                            animatedicon
                            position={'right'}
                            variant={'classic'}
                            classnames={styles.btnSeeAll}
                            color={'gold'}
                            size={'3'}
                            onClick={handleClick()}
			            />
                    </div>
	            )}
            </div>
        );
    }, [handleClick, isLoading, ranking?.data]);

    return (
        <div>
            <Card
                title={'(Últimas) Melhores notas'}
                html={<CardHtml/>}
                ownVariant={'ranking'}
                icon={<CrownIcon width={24} height={24} color={colors['color-gold-winner']}/>}
                titleSize={'5'}
            />

            {value && (
                <WrapModal
                    open={!!value}
                    title="(Últimas) Melhores notas"
                    onClose={clearSelect}
                />
            )}
        </div>
    );
}
