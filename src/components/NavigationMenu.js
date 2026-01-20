'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import colors from '@/colors';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { AvgRanking } from '@/helpers';
import useSize from '@/hooks/useSize';
import useStore, { removeAuthData } from '@/hooks/useStore';
import {
    PersonIcon, StarIcon,
} from '@radix-ui/react-icons';
import { Avatar } from '@radix-ui/themes';
import {
    BookOpenIcon, CrownIcon, HelpCircleIcon,
    Home, LockIcon,
    LogOutIcon,
    LucideChartNoAxesColumnIncreasing, SidebarIcon,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import styles from './NavigationMenu.module.css';

export default function NavigationMenu() {
    const [menuMobile, setMenuMobile] = useState(false);

    const pathName = usePathname();
    const router = useRouter();
    const user = useStore((state) => state.user);
    const { isTablet, isMobile, isLowerMobile } = useSize();

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
            {
                label: 'Planos',
                path: '/interno/planos',
                icon: <CrownIcon width={16} height={16}/>,
                handler: () => router.push('/interno/planos'),
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
                <DropdownMenuTrigger >
                    <Avatar
                        radius={'full'}
                        variant={'solid'}
                        fallback={user?.name?.charAt(0)}
                        color={'blue'}
                        size={'3'}
                        className={styles.avatar}
                    />
                </DropdownMenuTrigger>

                <DropdownMenuContent align={'start'} className={styles.dropDownClient}>
                    {dropDownOptions.map((item, index) => {
                        if (item.separator) {
                            return (
                                <div className={styles.labelDropdown}
                                    key={index}
                                >
                                    {item.topSeparator && <DropdownMenuSeparator />}
                                    {item.html}
                                    {!item.topSeparator && <DropdownMenuSeparator />}
                                </div>
                            );
                        }
                        return (
                            <div className={styles.labelDropdown} key={index}>
                                {item.html}
                            </div>
                        );
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }, [getSomeHelp, goToPlans, goToProfile, handleLogout, user?.id, user?.name]);

    return (
        <div className={styles.containerPageComponent}>
            {(menuMobile || isTablet || isMobile || isLowerMobile) && (
                <SidebarTrigger onClick={handleMobileModal(menuMobile)}/>
            )}
            <Sidebar className={styles.navigationContainer} variant={'floating'}>
                <SidebarContent>
                    <div className={styles.sidebarTrigger}>
                        <SidebarTrigger
                            icon={<SidebarIcon width={16} height={16}/>}
                            onClick={handleMobileModal(menuMobile)}
                        />
                    </div>
                    <SidebarHeader
                        className={styles.sidebarHeader}
                    >
                        <img
                            src="/tema-certo-black.svg"
                            alt="Logo do Tema Certo"
                            width={72}
                            height={72}
                        />
                        {FindUserRanking() && (
                            <Badge
                                text={FindUserRanking()?.label}
                                icon={<StarIcon />}
                                size={'2'}
                                radius={'full'}
                                color={FindUserRanking()?.color}
                                variant={'surface'}
                            />
                        )}
                    </SidebarHeader>
                    <Separator
                        my="3"
                        size="4"
                    />
                    <SidebarGroupContent>
                        <SidebarMenu className={styles.menuList}>
                            {mapMenuOptions()}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarContent>
                <Separator
                    my="3"
                    size="4"
                />
                <SidebarFooter
                    className={styles.sidebarFooter}
                >
                    {avatarOptions}
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}

NavigationMenu.Converter = function ConverterNavigationMenu() {
    const router = useRouter();

    const handleClickLogo = useCallback(() => {
        return () => router.push('/interno/inicio');
    }, [router]);

    return (
        <div className={styles.containerConverter}>
            <div className={styles.converterContainer}>
                <div>
                    <Button
                        text={<img
                            src="/tema-certo-black.svg"
                            alt="Logo do Tema Certo"
                            width={64}
                            height={64}
                        />}
                        variant={'ghost'}
                        color={'gray'}
                        size={'3'}
                        radius={'large'}
                        onClick={handleClickLogo()}
                    />
                </div>
                <div>
                    <Text
                        text={'Ambiente seguro'}
                        as="h1"
                        size="2"
                        color="gray"
                        icon={<LockIcon width={16} height={16}   />}
                    />
                </div>
            </div>
        </div>
    );
};
