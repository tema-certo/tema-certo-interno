import { useCallback, useEffect, useMemo } from 'react';

import Card from '@/components/Card';
import Tooltip from '@/components/Tooltip';
import { envs } from '@/envs';
import { verifyIfIsPro } from '@/helpers';
import useApi from '@/hooks/useApi';
import useStore from '@/hooks/useStore';
import Icons from '@/icons/icons';
import { FileTextIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import { BookOpenIcon, Calendar1Icon, TargetIcon } from 'lucide-react';
import { useQuery } from 'react-query';

import styles from './CardDataList.module.css';

const iconColors = {
    paper: {
        color: '#0b64f4',
    },
    target: {
        color: '#E7000BFF',
    },
    date: {
        color: '#F6339AFF',
    },
    lightning: {
        color: '#894b00',
    },
};

export function CardDataList() {
    const { metrics } = useStore((state) => state);
    const user = useStore((state) => state.user);

    const MetricsGroup = useMemo(() => {
        const textDays = metrics?.sequence > 1 ? 'dias' : metrics?.sequence === 0 ? '' : 'dia';

        return [
            {
                icon: <FileTextIcon width={24} height={24} color={iconColors.paper.color}/>,
                iconClassName: 'blue',
                subText: <div>Redações</div>,
                value: metrics?.totalEssays || '0',
            },
            {
                icon: <TargetIcon width={24} height={24} color={iconColors.target.color}/>,
                iconClassName: 'red',
                subText: <div>Melhor nota</div>,
                value: metrics?.maxScore || '0',
            },
            {
                icon: <Calendar1Icon width={24} height={24} color={iconColors.date.color}/>,
                iconClassName: 'pink',
                subText: <div>Este mês</div>,
                value: metrics?.monthlyEssays || '0',
            },
            {
                icon: <Icons.FireIcon width={24} height={24} color={iconColors.lightning.color}/>,
                iconClassName: 'gold',
                subText: <div>Sequência</div>,
                value: `${metrics?.sequence || 0} ${textDays}`,
                exclusivePro: true,
            },
        ];
    }, [metrics]);

    return (
        <div className={styles.cardsContainer}>
            {MetricsGroup.map((item, index) => {
                if (!verifyIfIsPro(user) && item?.exclusivePro) {
                    return (
                        <div key={index}>
                            <Card.WithIcon
                                key={index}
                                subText={item.subText}
                                value={'-'}
                                iconClassName={item.iconClassName}
                                icon={item.icon}
                                minW={'200px'}
                                className={styles.cardProBlur}
                            />
                            <Tooltip
                                children={'Sistema de ofensiva apenas para membros Pro'}
                                className={styles.tooltipPro}
                            />
                        </div>
                    );
                }

                return (
                    <Card.WithIcon
                        key={index}
                        subText={item.subText}
                        value={item.value}
                        iconClassName={item.iconClassName}
                        icon={item.icon}
                        minW={'200px'}
                    />
                );
            })}
        </div>
    );
}
