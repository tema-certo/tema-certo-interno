'use client';

import { useCallback, useMemo } from 'react';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { AvgRanking } from '@/helpers';
import useStore from '@/hooks/useStore';
import { BookmarkIcon, BarChartIcon, StarIcon } from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import { BarChartHorizontalIcon, BookOpenIcon, Home, LucideChartNoAxesColumnIncreasing } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import styles from './NavigationMenu.module.css';


export default function NavigationMenu() {
    const pathName = usePathname();
    const router = useRouter();
    const user = useStore((state) => state.user);

    const menuOptions = useMemo(() => {
        return [
            {
                label: 'Início',
                path: '/interno/inicio',
                icon: <Home width={16} height={16}/>,
                handler: () => router.push('/interno/inicio'),
            },
            {
                label: 'Temas',
                path: '/interno/temas',
                icon: <BookOpenIcon width={16} height={16}/>,
                handler: () => router.push('/interno/temas'),
            },
            {
                label: 'Estatísticas',
                path: '/interno/estatisticas',
                icon: <LucideChartNoAxesColumnIncreasing width={16} height={16}/>,
                handler: () => router.push('/interno/estatisticas'),
            },
        ];
    }, [router]);

    const mapMenuOptions = useCallback(() => {
        return (
            menuOptions.map(item => {
                return (
                    <li key={item.label}>
                        <Button
                            text={item.label}
                            icon={item.icon}
                            position={'left'}
                            variant={'ghost'}
                            radius={'large'}
                            color={'gray'}
                            onClick={item.handler}
                            size={'3'}
                            className={pathName === item.path && 'active'}
                        />
                    </li>
                );
            })
        );
    }, [menuOptions, pathName]);

    const FindUserRanking = useCallback(() => {
        const score = user?.averageScore || 0;

        return AvgRanking.find(item => {
            if (item.betterThan) {
                return score > item.value;
            }
            return score <= item.value;
        });
    }, [user]);

    return (
        <div className={styles.containerPageComponent}>
            <div className={styles.navigationContainer}>
                <div>
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <button onClick={() => router.push('/interno/inicio')} className={styles.logoContainer}>
                        <img
                            src="/tema-certo-black.svg"
                            alt="Logo do Tema Certo"
                            width={56}
                            height={56}
                        />
                    </button>
                </div>
                <div>
                    <ul className={styles.menuList}>
                        {mapMenuOptions()}
                    </ul>
                </div>
                <div className={styles.userContainer}>
                    <Badge
                        text={FindUserRanking()?.label}
                        icon={<StarIcon/>}
                        radius={'full'}
                        color={FindUserRanking().color}
                        variant={'surface'}
                    />
                    <Avatar
                        radius={'full'}
                        variant={'solid'}
                        fallback={user?.name?.charAt(0)}
                        color={'blue'}
                        size={'3'}
                    />
                </div>
            </div>
        </div>
    );
}
