'use client';

import { useCallback, useState, useEffect, useRef } from 'react';

import LocationHandler from '@/app/login/domains/LocationHandler';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { dismissLoadingToast, setTokenCookieSec } from '@/helpers';
import useApi from '@/hooks/useApi';
import useAsync from '@/hooks/useAsync';
import useStore, { setUserLoginData } from '@/hooks/useStore';
import Icons from '@/icons/icons';
import { Separator } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import styles from './login.module.css';

export default function Page() {
    const [title, setTitleValue] = useState('');
    const api = useApi({ url: envs.API_URL });
    const googleButtonRef = useRef(null);

    const router = useRouter();

    const setTitle = useCallback((v) => {
        return setTitleValue(v);
    }, []);

    const { call: handleCredentialResponse } = useAsync(async (response) => {
        const googleLoder = toast.loading('Acessando sua conta...');

        const credential = response?.credential;

        try {
            const { data } = await api.post('/login-oauth', {
                id_token: credential,
            });

            await setTokenCookieSec(data?.token);

            dismissLoadingToast({
                toastId: googleLoder,
                type: 'success',
                message: 'Sucesso! Vamos te redirecionar para seu acesso.',
            });

            await router.replace('/interno/inicio');
        } catch (e) {
            dismissLoadingToast({
                toastId: googleLoder,
                type: 'error',
                message: 'Acesso inválido.',
            });
        }
    });

    const initializeGoogleSignIn = useCallback(() => {

        if (window.google && googleButtonRef) {
            window.google.accounts.id.initialize({
                client_id: envs.GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
            });

            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                {
                    size: 'large',
                    type: 'standard',
                    width: 100,
                },
            );

        }
    }, [handleCredentialResponse]);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            initializeGoogleSignIn();
        };

        return () => {
            document.body.removeChild(script);
        };
    }, [initializeGoogleSignIn]);

    const modalFinalSeparator = useCallback(() => {
        return (
            <div className={styles.finalLogin}>
                <Text.Separator
                    size={'1'}
                    text={'OU COM'}
                    color={'gray'}
                />
                <div className={styles.googleBtnContainer}>
                    <div ref={googleButtonRef} />
                </div>
            </div>
        );
    }, []);

    return (
        <Container>
            <main className={styles.loginContainer}>
                <img
                    src="/tema-certo-black.svg"
                    alt="Logo do Tema Certo"
                    width={100}
                    height={100}
                />
                <Text text={'Sua plataforma de redações.'} size={'2'} color={'gray'} />
                <Card
                    title={title || 'Entrar'}
                    html={<LocationHandler setTitle={setTitle} />}
                    minW={'20px'}
                    maxW={'480px'}
                    aligntitle={'center'}
                    basecontent={modalFinalSeparator()}
                    noBorder
                />
            </main>
        </Container>
    );
}
