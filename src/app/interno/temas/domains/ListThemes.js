import { useMemo, useEffect, useRef, useCallback, useState } from 'react';

import Filters from '@/app/interno/temas/domains/Filters';
import EssaySelectorCard from '@/components/EssaySelectorCard';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { Skeleton } from '@radix-ui/themes';
import { useInfiniteQuery } from 'react-query';

import EssayContainer from './EssayContainer';
import styles from './ListThemes.module.css';


const REQUEST_LIMIT_INITIAL = 8;
const REQUEST_LIMIT_ADD = 8;
const REQUEST_PAGE_INITIAL = 1;

export default function  ListThemes() {
    const api = useApi({ url: envs.API_URL });
    const observerTarget = useRef(null);
    const { isLowerMobile, isMobile, isTablet } = useSize();

    // Filtros
    const [filters, changeFilters] = useState({});

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        ['listThemes'],
        async ({ pageParam = REQUEST_PAGE_INITIAL }) => {
            const limit =
                pageParam === REQUEST_PAGE_INITIAL
                    ? REQUEST_LIMIT_INITIAL
                    : REQUEST_LIMIT_ADD;

            const res = await api.get(
                `/get-themes-list?page=${pageParam}&limit=${limit}`,
            );

            return {
                allData: res.data,
                data: res.data.data || res.data,
                page: pageParam,
                hasMore: res.data.hasMore ?? (res.data.data?.length >= limit),
            };
        },
        {
            getNextPageParam: (lastPage) => {
                if (!lastPage?.hasMore || !lastPage?.data?.length) {
                    return undefined;
                }
                return lastPage.page + 1;
            },
        },
    );

    const essays = useMemo(() => {
        return data?.pages.flatMap(page => {
            return page.data;
        }) ?? [];
    }, [data?.pages]);

    const handleObserver = useCallback((entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        const element = observerTarget.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => handleObserver(entries, observer),
            {
                root: null,
                rootMargin: '300px',
                threshold: 0.1,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [handleObserver]);

    const minW =
        isLowerMobile ? '200px' :
            isMobile ? '200px' :
                isTablet ? '380px' :
                    '290px';


    const mapSkeletons = useCallback(() => {
        return Array.from({ length: REQUEST_LIMIT_INITIAL }).map((_, index) => (
            <Skeleton
                width={minW}
                height="280px"
                key={index}
                className={styles.skeleton}  />
        ));
    }, [minW]);

    return (
        <div className={styles.container}>
            <Filters
                data={essays}
                filters={filters}
                changeFilters={changeFilters}
            />

            <EssayContainer
                essays={essays}
                filters={filters}
            />

            {!essays.length && (
                <div className={styles.containerSkeleton}>
                    {mapSkeletons()}
                </div>
            )}

            {hasNextPage && !isFetchingNextPage && (
                <div
                    ref={observerTarget}
                />
            )}

            {isFetchingNextPage && (
                <div className={styles.containerSkeleton}>
                    {Array.from({ length: REQUEST_LIMIT_ADD }).map((_, index) => (
                        <Skeleton
                            key={index}
                            width={minW}
                            height="280px"
                            className={styles.skeleton}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
