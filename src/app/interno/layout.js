
'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { LoadUiAdvise } from '@/components/LoaderUiAdvise';
import NavigationMenu from '@/components/NavigationMenu';
import { SidebarProvider } from '@/components/ui/sidebar';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import useStore from '@/hooks/useStore';
import {  ClientProviders } from '@/providers';
import { Theme } from '@radix-ui/themes';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

const hiddenMenuRoutes = ['/interno/checkout'];

export default function ProtectedLayout({ children }) {
    const api = useApi({ url: envs.API_URL });
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setMetrics = useStore((state) => state.setMetrics);

    const pathname = usePathname();

    useEffect(() => {
        if (!user) {
            api.get('/user-info').then((response) => {
                setUser(response.data);
            });
        }
    }, [api, setUser, user]);

    const shouldShowNavigationMenu = useMemo(() => {
        return !hiddenMenuRoutes.some(route =>
            pathname.startsWith(route),
        );
    }, [pathname]);

    useQuery({
        queryKey: 'metrics',
        queryFn: async () => {
            const { data } = await api.get('/user-metrics');
            return data;
        },
        onSuccess: (data) => {
            setMetrics(data);
        },
        refetchOnMount: true,
    });

    if (!user) {
        return <LoadUiAdvise/>;
    }

    return (
        <Theme>
            <SidebarProvider>
                <ClientProviders>
                    {shouldShowNavigationMenu && <NavigationMenu />}
                    {children}
                </ClientProviders>
            </SidebarProvider>
        </Theme>
    );
}
