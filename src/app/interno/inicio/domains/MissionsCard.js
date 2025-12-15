import { useCallback, useMemo, useRef } from 'react';

import colors from '@/colors';
import Card from '@/components/Card';
import Mission from '@/components/Mission';
import Text from '@/components/Text';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import useStore from '@/hooks/useStore';
import { ChartBarIncreasing, TrendingUpIcon } from 'lucide-react';
import { useQuery } from 'react-query';

import styles from './MissionsCard.module.css';

export function MissionsCard() {
    const api = useApi({ url: envs.API_URL });
    const noMissions = useRef(false);

    const { data: missions } = useQuery({
        queryKey: 'missions',
        queryFn: async () => {
            return await api.get('/get-user-missions');
        },
        refetchOnMount: true,
    });

    const missionsDisponible = useMemo(() => {
        const haveMissions = missions?.data?.missions ?? [];

        if (!haveMissions.length) {
            return [];
        }

	    const sorted = haveMissions.sort((a, b) => {
            return Number(a?.index) - Number(b?.index);
	    });

        return sorted;
    }, [missions?.data]);

    if (!missionsDisponible.length) {
        noMissions.current = true;
    } else {
        noMissions.current = false;
    }

    return (
        <div>
            <Card
                title={`Missões nível ${missions?.data?.level}`}
                icon={<TrendingUpIcon width={24} height={24} color={ colors['color-light-blue'] }/>}
                html={
                    <div className={styles.missionsContainer}>
                        {noMissions.current && (
                            <Text
                                text={'Você não possui missões disponíveis.'}
                                as={'p'}
                                size={'2'}
                                color={'gray'}
                            />
                        )}

                        {missionsDisponible.map((item, index) => (
                            <div
                                key={index}
                                className={styles.missions}
                            >
                                <Mission
                                    title={item?.title}
                                    countTarget={item?.target?.count}
                                    target={item?.target?.identifier}
                                    countCurrent={item?.progress}
                                    times={item?.target?.times}
                                    strategy={item?.strategy}
                                    objective={item?.objective}
                                />
                            </div>
                        ))}
                    </div>
                }
                aligntitle={'left'}
                ownVariant={'tip'}
                titleSize={'5'}
            />
        </div>
    );
}
