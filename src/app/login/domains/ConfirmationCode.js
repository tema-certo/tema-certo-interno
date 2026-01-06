import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { envs } from '@/envs';
import { dismissLoadingToast, setTokenCookieSec } from '@/helpers';
import useApi from '@/hooks/useApi';
import { setUserLoginData } from '@/hooks/useStore';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

import styles from './ConfirmationCode.module.css';


export default function ConfirmationCode({
    email,
}) {
    const [timer, setTimer] = useState(0);
    const [otpValue, setOtpValue] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    const api = useApi({ url: envs.API_URL });
    const router = useRouter();

    const mapSlots = useCallback(() => {
        return Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot
                key={index}
                index={index}
                className={styles.inputOTPSlot}
            />
        ));
    }, []);

    const {
        refetch: resendEmail,
    } = useQuery({
        queryKey: 'resendEmail',
        refetchOnMount: false,
        queryFn: async () => {
            setTimer(30);

            await api.post('/resend-email-confirmation', {
                email,
            });

            return null;
        },
        enabled: false,
        retry: false,
    });

    const {
        refetch: confirmCode,
        isLoading,
    } = useQuery({
        queryKey: 'confirmCode',
        refetchOnMount: false,
        queryFn: async () => {
            const toastId = toast.loading('Confirmando código...');

            try {
                const { data } = await api.post('/validate-code-confirmation', {
                    email,
                    code: otpValue,
                });

                await setTokenCookieSec(data?.token);

                dismissLoadingToast({
                    toastId,
                    type: 'success',
                    message: 'Código confirmado com sucesso! Vamos te redirecionar para seu acesso.',
                });

                await router.replace('/interno/inicio');
            } catch (e) {
                dismissLoadingToast({
                    toastId,
                    type: 'error',
                    message: 'Código inválido. Tente novamente com um outro código.',
                });
            }
        },
        enabled: false,
    });

    return (
        <div className={styles.confirmationCodeContainer}>
            <div>
                <Text
                    text={'Enviamos um código de confirmação para o email: '}
                    type={'2'}
                    color={'gray'}
                />
                <Text
                    text={email}
                    type={'2'}
                    color={'gray'}
                    bold
                />
            </div>
            <div className={styles.inputOTPContainer}>
                <InputOTP
                    maxLength={6}
                    /* eslint-disable-next-line react/jsx-no-bind */
                    onChange={(value) => setOtpValue(value)}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otpValue}
                >
                    <InputOTPGroup
                        className={styles.inputOTPGroup}
                    >
                        {mapSlots()}
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div className={styles.resendCodeContainer}>
                <Text
                    text={'Não recebeu o código? '}
                    type={'2'}
                    color={'gray'}
                />
                <Button
                    text={`Reenviar ${timer > 0 ? `(${timer}s)` : ''}`}
                    color={'blue'}
                    variant={'ghost'}
                    onClick={resendEmail}
                    disabled={timer > 0}
                />
            </div>
            <div className={styles.buttonConfirm}>
                <Button
                    text={'Confirmar'}
                    color={'blue'}
                    variant={'solid'}
                    size={'4'}
                    radius={'medium'}
                    disabled={otpValue.length !== 6}
                    onClick={confirmCode}
                    loading={isLoading}
                />
            </div>
        </div>
    );
}
