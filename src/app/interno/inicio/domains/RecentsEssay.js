import { useCallback, useMemo } from 'react';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { AvgRanking } from '@/helpers';
import useApi from '@/hooks/useApi';
import { Pencil, PencilLineIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

import styles from './RecentsEssay.module.css';

export default function RecentsEssay() {
    const api = useApi({ url: envs.API_URL });
    const router = useRouter();

    const { data: listEssays } = useQuery({
        queryKey: 'listEssays',
        queryFn: async () => {
            return await api.get('/last-essays-completed');
        },
        refetchOnMount: true,
    });

    const handleClick = useCallback(() => {
        return router.push('/interno/temas');
    }, [router]);

    const elements = useMemo(() => {
        const slices = listEssays?.data?.slice(0, 3) ?? [];

        if (!slices.length) {
            return (
                <div className={styles.containerNoEssay}>
                    <Text
                        text={'Você ainda não realizou nenhuma redação.'}
                        size={'3'}
                        color={'gray'}
                    />
                    <Button
                        text={'Fazer uma redação'}
                        icon={<PencilLineIcon width={16} height={16} />}
                        size={'3'}
                        variant={'classic'}
                        color={'blue'}
                        onClick={handleClick}
                    />
                </div>
            );
        }

        return slices.map((item, index) => {
            const stringedDate = new Date(item?.date).toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });

            const badgeColorStyle = () => {
                const itemScore = item?.score;

                if (itemScore <= 350) {
                    return 'red';
                }

                if (itemScore <= 500) {
                    return 'yellow';
                }

                if (itemScore <= 650) {
                    return 'purple';
                }

                if (itemScore <= 800) {
                    return 'blue';
                }

                return 'green';
            };

            return (
                <Button
                    key={index}
                    variant={'ghost'}
                    radius={'large'}
	            >
                    <div className={styles.containerEssayBadge}>
                        <div className={styles.containerEssay}>
                            <Text
                                text={item?.theme_title}
                                size={'3'}
                                color={'black'}
                                bold
		                    />
                            <Text
                                text={stringedDate}
                                size={'2'}
                                color={'gray'}
		                    />
                        </div>
                        <div className={styles.containerScore}>
                            <Badge
                                text={item?.score}
                                variant={'surface'}
                                radius={'full'}
                                size={'2'}
                                color={badgeColorStyle()}
		                    />
                        </div>
                    </div>
                </Button>
            );
        });
    }, [listEssays, handleClick]);


    return (
        <div>
            <Card
                maxW={ '860px' }
                title={ 'Redações recentes' }
                titleSize={ '5' }
                html={
                    <div className={styles.recents}>
                        {elements}
                    </div>
                }
            />
        </div>
    );
}
