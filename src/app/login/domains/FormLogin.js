import { useCallback, useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { InputPassword } from '@/helpers';
import useApi from '@/hooks/useApi';
import useAsync from '@/hooks/useAsync';
import {
    ArrowRightIcon,
    EnvelopeClosedIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    LetterSpacingIcon,
    LockClosedIcon,
} from '@radix-ui/react-icons';
import { useForm, Controller } from 'react-hook-form';

import styles from './FormLogin.module.css';

export default function FormLogin() {
    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // TODO: IMPLEMENTAR ENVS. First STEP antes de implementar reqs.
    const api = useApi({ url: 'http://localhost:3001/api' });

    console.log(control, handleSubmit);

    const { loading, call: loginUser } = useAsync(async (formData) => {
        try {
            const { data } = await api.post('/login', {
                email: formData?.email,
                password: formData?.password,
            });
            setTimeout(() => {
                console.log('ok');
            }, 3999);
            // TODO: FINALIZAR LOGICA DE LOGIN E ARMAZENAMENTO DE DADOS COM ZUSTAND
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <div>
            <form onSubmit={handleSubmit(loginUser)}>
                <div className={styles.loginInputs}>
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
                    />
                </div>
                <div className={styles.forgotPassword}>
                    <Button
                        text={'Esqueceu sua senha?'}
                        color={'blue'}
                        variant={'ghost'}
                        disabled={isSubmitting}
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button
                        text={'Entrar'}
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
            </form>
        </div>
    );
}
