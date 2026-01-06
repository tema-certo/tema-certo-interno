'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import colors from '@/colors';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Text from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { AvgRanking, setExtraClass } from '@/helpers';
import useClassnames from '@/hooks/useClassnames';
import useScroll from '@/hooks/useScroll';
import useSize from '@/hooks/useSize';
import useStore, { removeAuthData } from '@/hooks/useStore';
import Icons from '@/icons/icons';
import {
    BookmarkIcon,
    BarChartIcon,
    StarIcon,
    HamburgerMenuIcon,
    LightningBoltIcon,
    PersonIcon,
} from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import {
    BarChartHorizontalIcon,
    BookOpenIcon, CrownIcon, HelpCircleIcon,
    Home,
    LogOutIcon,
    LucideChartNoAxesColumnIncreasing,
    XIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import styles from './NavigationMenu.module.css';

export default function NavigationMenu() {
    const [menuMobile, setMenuMobile] = useState(false);
    const [seeOpt, setSeeOpt] = useState(false);

    const pathName = usePathname();
    const router = useRouter();
    const user = useStore((state) => state.user);
    const metrics = useStore((state) => state.metrics);
    const { isTablet, isMobile, isLowerMobile } = useSize();
    const { scrolled } = useScroll();

    const definedClasses = useClassnames(setExtraClass(styles.containerPageComponent, [scrolled && styles.moved]));

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

    const handleChangePage = useCallback((fn) => {
        return () => {
            if (isTablet || isMobile || isLowerMobile) {
                setMenuMobile(false);
            }
            fn();
        };
    }, [isLowerMobile, isMobile, isTablet]);

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
                            onClick={handleChangePage(item.handler)}
                            size={'3'}
                            className={pathName === item.path && 'active'}
                        />
                    </li>
                );
            })
        );
    }, [handleChangePage, menuOptions, pathName]);

    const FindUserRanking = useCallback(() => {
        const score = user?.averageScore || 0;

        return AvgRanking.find(item => {
            if (item.betterThan) {
                return score >= item.value;
            }
            return score <= item.value;
        });
    }, [user]);

    const handleMobileModal = useCallback(value => {
        return () => setMenuMobile(!value);
    }, []);


    const handleAvatar = useCallback(() => {
        return () => {
            setSeeOpt(!seeOpt);
        };
    }, [seeOpt]);

    const handleLogout = useCallback(() => {
        return async () => {
            await removeAuthData();
            router.push('/login');
        };
    }, [router]);

    const goToProfile = useCallback(() => {
        return () => router.push('/interno/perfil');
    }, [router]);

    const goToPlans = useCallback(() => {
        return () => router.push('/interno/planos');
    }, [router]);

    const getSomeHelp = useCallback(() => {
        return () => router.push('/interno/ajuda');
        // TODO: Adicionar movidesk talvez? alguma plataforma free de suporte?
    }, [router]);

    const avatarOptions = useMemo(() => {
        const dropDownOptions = [
            {
                html: (
                    <DropdownMenuLabel>
                        <div className={styles.dropDownData}>
                            <Text
                                text={user?.name}
                            />
                            <Text
                                text={`ID: ${user?.id}`}
                                color={'gray'}
                            />
                        </div>
                    </DropdownMenuLabel>
                ),
                separator: true,
            },
            {
                html: (
                    <DropdownMenuItem
                        onClick={goToProfile()}
                    >
                        <PersonIcon width={16} height={16}/> Meu perfil
                    </DropdownMenuItem>
                ),
            },
            {
                html: (
                    <DropdownMenuItem
                        onClick={getSomeHelp()}
                    >
                        <HelpCircleIcon width={16} height={16}/> Ajuda
                    </DropdownMenuItem>
                ),
            },
            {
                html: (
                    <DropdownMenuItem
                        onClick={goToPlans()}
                    >
                        <CrownIcon
                            width={16}
                            height={16}
                            color={colors['color-gold-winner']}
                        /> Planos
                    </DropdownMenuItem>
                ),
                separator: true,
                topSeparator: true,
            },
            {
                html: (
                    <DropdownMenuItem
                        onClick={handleLogout()}
                        variant={'destructive'}
                    >
                        <LogOutIcon width={16} height={16}/> Sair
                    </DropdownMenuItem>
                ),
                separator: true,
                topSeparator: true,
            },
        ];

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="outline-none focus:outline-none ring-0 focus:ring-0"
                    >
                        <Avatar
                            radius={'full'}
                            variant={'solid'}
                            fallback={user?.name?.charAt(0)}
                            color={'blue'}
                            size={'3'}
                            className={styles.avatar}
                        />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align={'start'} className={styles.dropDownClient}>
                    {dropDownOptions.map(item => {
                        if (item.separator) {
                            return (
                                <div className={styles.labelDropdown}>
                                    {item.topSeparator && <DropdownMenuSeparator />}
                                    {item.html}
                                    {!item.topSeparator && <DropdownMenuSeparator />}
                                </div>
                            );
                        }
                        return (
                            <div className={styles.labelDropdown}>
                                {item.html}
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }, [getSomeHelp, goToPlans, goToProfile, handleLogout, user?.id, user?.name]);

    if (isTablet || isMobile || isLowerMobile) {
        return (
            <div className={definedClasses}>
                {!menuMobile && (
                    <div className={styles.navigationContainer}>
                        <Button
                            variant={'ghost'}
                            radius={'large'}
                            color={'gray'}
                            size={'2'}
                            onClick={handleMobileModal(menuMobile)}
                        >
                            <HamburgerMenuIcon
                                width={24}
                                height={24}
                            />
                        </Button>
                    </div>
                )}
                {menuMobile && (
                    <>
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <div className={styles.overlay} onClick={handleMobileModal(menuMobile)} />

                        <div className={styles.menuMobile}>
                            <div className={styles.logoContainerMobile}>
                                <Button
                                    variant={'ghost'}
                                    radius={'large'}
                                    color={'gray'}
                                    size={'2'}
                                    onClick={handleMobileModal(menuMobile)}
                                >
                                    <XIcon />
                                </Button>
                            </div>

                            <div className={styles.userContainer}>
                                {avatarOptions}
                                <div className={styles.userScore}>
                                    <Icons.FireIcon width={12} height={12} color={'#894b00'} />
                                    <Text text={metrics?.sequence || 0} size={'2'} />
                                </div>
                                <div className={styles.rankingBadge}>
                                    <Tooltip
                                        children={'Ranking'}
                                        icon={<Badge
                                            text={FindUserRanking()?.label}
                                            icon={<StarIcon />}
                                            radius={'full'}
                                            color={FindUserRanking()?.color}
                                            variant={'surface'}
                                        />}>
                                        {'O seu ranking depende da sua média de pontos.'}
                                    </Tooltip>
                                </div>
                            </div>

                            <ul className={styles.menuList}>
                                {mapMenuOptions()}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        );
    }

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
                    <div className={styles.userScore}>
                        <Icons.FireIcon width={12} height={12} color={'#894b00'}/>
                        <Text
                            text={metrics?.sequence || 0}
                            size={'2'}
                        />
                    </div>
                    <div className={styles.rankingBadge}>
                        <Tooltip
                            children={'Ranking'}
                            icon={<Badge
                                text={FindUserRanking()?.label}
                                icon={<StarIcon />}
                                radius={'full'}
                                color={FindUserRanking()?.color}
                                variant={'surface'}
                            />}>
                            {'O seu ranking depende da sua média de pontos.'}
                        </Tooltip>
                    </div>
                    <button
                        onClick={handleAvatar()}
                        className={styles.avatarContainer}
                    >
                        {avatarOptions}
                    </button>
                </div>
            </div>
        </div>
    );
}
