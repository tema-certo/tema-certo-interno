import { useMemo } from 'react';

import EssaySelectorCard from '@/components/EssaySelectorCard';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import { useQuery } from 'react-query';

import EssayContainer from './EssayContainer';
import styles from './ListThemes.module.css';

const REQUEST_LIMIT_INITIAL = 16;
const REQUEST_LIMIT_ADD = 8;
const REQUEST_PAGE_INITIAL = 1;
const REQUEST_PAGE_ADD = 1;

export default function ListThemes() {
    const api = useApi({ url: envs.API_URL });

    const { data: listThemes } = useQuery({
        queryKey: 'listThemes',
        queryFn: async () => {
            return await api.get(`/get-themes-list?page=${REQUEST_PAGE_INITIAL}&limit=${REQUEST_LIMIT_INITIAL}`);
        },
        refetchOnMount: true,
    });

    const renderEssays = useMemo(() => {
        if (!listThemes?.data || !listThemes?.data?.data.length) {
            return [];
        }

        return listThemes?.data?.data;
    }, [listThemes?.data]);

    return (
        <section className={styles.containerEssays}>
            <EssayContainer
                essays={renderEssays}
                mockedImg={'/img.avif'}
            />
        </section>
    );
}
