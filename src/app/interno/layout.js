
'use client';

import { useEffect } from 'react';

import { LoadUiAdvise } from '@/components/LoaderUiAdvise';
import NavigationMenu from '@/components/NavigationMenu';
import { envs } from '@/envs';
import useApi from '@/hooks/useApi';
import useStore from '@/hooks/useStore';
import {  ClientProviders } from '@/providers';
import { Theme } from '@radix-ui/themes';
import { useQuery } from 'react-query';


export default function ProtectedLayout({ children }) {
    const api = useApi({ url: envs.API_URL });
    const user = useStore((state) => state.user);
    const setUser = useStore((state) => state.setUser);
    const setMetrics = useStore((state) => state.setMetrics);

    useEffect(() => {
        if (!user) {
            api.get('/user-info').then((response) => {
                setUser(response.data);
            });
        }

    }, [api, setUser, user]);

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
            <ClientProviders>
                <NavigationMenu />
                {children}
            </ClientProviders>
        </Theme>
    );
}
