import { useCallback, useEffect, useState } from 'react';

import ConfirmationCode from '@/app/login/domains/ConfirmationCode';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { InputPassword } from '@/components/InputPassword';
import { WrapModal } from '@/components/Modal';
import { envs } from '@/envs';
import { dismissLoadingToast, setTokenCookieSec } from '@/helpers';
import useApi from '@/hooks/useApi';
import useAsync from '@/hooks/useAsync';
import useSelector from '@/hooks/useEssaySelector';
import useStore, { setUserLoginData } from '@/hooks/useStore';
import {
    ArrowRightIcon,
    EnvelopeClosedIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    LetterSpacingIcon,
    LockClosedIcon, PersonIcon,
} from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import styles from './FormLogin.module.css';

const toastLayoutMessages = {
    createAccountLoading: 'Criando sua conta...',
    createAccountSuccess: 'Conta criada com sucesso! Vamos te redirecionar para seu acesso.',
    preRegisterAccountSuccess: 'Pré-registro concluído. Verifique seu e-mail para continuar.',
    createAccountError: {
        title: 'Erro ao criar conta',
        description: 'Tente inserir um novo e-mail ou senha para acessar.',
    },
};

export default function FormRegister() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        getValues,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });
    const api = useApi({ url: envs.API_URL });
    const router = useRouter();
    const { onSelect, clearSelect, value } = useSelector();

    const { loading, call: loginUser } = useAsync(async (formData) => {
        const toastId = toast.loading(toastLayoutMessages.createAccountLoading);

        try {
            await api.post('/create-user', {
                user: {
                    name: formData?.name,
                    email: formData?.email,
                    secret: formData?.password,
                },
            });

            onSelect(true);

            dismissLoadingToast({
                toastId,
                type: 'success',
                message: toastLayoutMessages.preRegisterAccountSuccess,
            });

            await router.replace('/interno/inicio');
        } catch (e) {
            toast.dismiss(toastId);
            toast.error(toastLayoutMessages.createAccountError.title, {
                description: toastLayoutMessages.createAccountError.description,
            },
            );
        }
    });

    const handleKeyDown = useCallback((e) => {
        if (e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
        }
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit(loginUser)}>
                <div className={styles.loginInputs}>
                    <Input.Field
                        control={control}
                        placeholder={'Seu nome'}
                        size={'3'}
                        radius={'large'}
                        required
                        color={'blue'}
                        label={'Nome completo'}
                        name={'name'}
                        id={'name'}
                        icon={<PersonIcon/>}
                        disabled={loading}
	                />
                    <Input.Field
                        control={control}
                        placeholder={'seu@email.com'}
                        size={'3'}
                        radius={'large'}
                        required
                        color={'blue'}
                        label={'Email'}
                        name={'email'}
                        id={'email'}
                        icon={<EnvelopeClosedIcon/>}
                        disabled={loading}
                    />
                    <InputPassword
                        control={control}
                        placeholder={'•••••••'}
                        size={'3'}
                        radius={'large'}
                        required
                        color={'blue'}
                        label={'Senha'}
                        name={'password'}
                        id={'password'}
                        disabled={loading}
                        onKeyDown={handleKeyDown}
                        isRegister
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        text={'Criar conta'}
                        color={'blue'}
                        variant={'solid'}
                        size={'4'}
                        radius={'medium'}
                        icon={<ArrowRightIcon/>}
                        position={'right'}
                        type={'submit'}
                        classnames={styles.btnLogin}
                        animatedicon
                        loading={isSubmitting}
                    />
                </div>
                {
                    value && (
                        <WrapModal
                            open={!!value}
                            title={'Verifique seu e-mail'}
                            clearSelect={clearSelect}
                            cannotClose
                        >
                            <ConfirmationCode
                                email={getValues()?.email}
                            />
                        </WrapModal>
                    )
                }
            </form>
        </div>
    );
}
