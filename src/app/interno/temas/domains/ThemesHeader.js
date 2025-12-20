import { useCallback, useMemo } from 'react';

import colors from '@/colors';
import Card from '@/components/Card';
import Text from '@/components/Text';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import Icons from '@/icons/icons';
import { FileTextIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { FileInputIcon, PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { useQuery } from 'react-query';

import styles from './ThemesHeader.module.css';

export default function ThemesHeader() {
    const api = useApi({ url: envs.API_URL });

    const { data: stats, isLoading } = useQuery([
        'stats',
    ], {
        queryFn: async () => {
            return await api.get('/themes-stats');
        },
        refetchOnMount: false,
        suspense: true,
    });

    const mountCardData = useMemo(() => {
        const statsData = stats?.data ?? {};

        return [
            {
                subText: <div>Qntd. de temas para praticar</div>,
                value: statsData?.themesStats?.totalThemes || '0',
                title: 'Temas disponíveis',
                icon: <PlusCircledIcon width={24} height={24} color={colors['color-title-blue']}/>,
                iconClassName: 'blue',
            },
            {
                subText: <div>Qntd. de temas direto do ENEM</div>,
                value: statsData?.themesStats?.totalEnemThemes || '0',
                title: 'Temas do ENEM disponíveis',
                icon: <FileTextIcon width={24} height={24} color={colors['color-title-blue']}/>,
                iconClassName: 'blue',
            },
            {
                subText: <div>Qntd. de redações enviadas</div>,
                value: statsData?.themesResolved || '0',
                title: 'Qnt. de temas praticados',
                icon: <FileInputIcon width={24} height={24} color={colors['color-title-blue']}/>,
                iconClassName: 'blue',
            },
        ];
    }, [stats]);

    const mountCardsComponent = useCallback(() => {
        return mountCardData.map((item, index) => (
            <Card.WithIcon
                key={index}
                subText={item.subText}
                value={item.value}
                iconClassName={item.iconClassName}
                icon={item.icon}
                minW={'200px'}
            />
        ));
    }, [mountCardData]);

    return (
        <div className={styles.containerHeaderTop}>
            <div className={styles.containerHeader}>
                <Text
                    as={'h1'}
                    type={'9'}
                    bold
                    isTitle
                >
                    Explore nossa biblioteca de <Text
                        as={'span'}
                        isTitle
                        classNames={styles.titleColorChange}
                    >Temas</Text>
                </Text>
                <Text
                    as={'p'}
                    size={'4'}
                    color={'gray'}
                >
                    Selecione um tema da nossa coleção curada para praticar sua redação. Filtre por instituição, dificuldade ou categoria para encontrar o tema ideal.
                </Text>
            </div>
            <div className={styles.containerCards}>
                {mountCardsComponent()}
            </div>
        </div>
    );
}
