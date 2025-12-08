import { useCallback, useEffect, useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { WrapModal } from '@/components/Modal';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { dismissLoadingToast, InputPassword } from '@/helpers';
import useApi from '@/hooks/useApi';
import useAsync from '@/hooks/useAsync';
import useStore from '@/hooks/useStore';
import {
    ArrowRightIcon, CheckIcon,
    EnvelopeClosedIcon,
    EyeClosedIcon,
    EyeOpenIcon,
    LetterSpacingIcon,
    LockClosedIcon,
} from '@radix-ui/react-icons';
import { CheckCircleIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';

import styles from './FormLogin.module.css';

function FormRecoverPwd({
    setSended,
}) {
    const [alwaysSendedEmail, setAlwaysSendedEmail] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
        },
    });
    const api = useApi({ url: envs.API_URL });

    const { loading, call: recoveryPassword } = useAsync(async (formData) => {
        try {
            await api.post('/create-recovery-try', {
                email: formData?.email,
            });
            setAlwaysSendedEmail(true);
            setSended(true);
        } catch (e) {
            toast.error('Erro ao recuperar senha.', {
                description: 'Tente novamente mais tarde.',
            },
            );
        }
    });

    return (
        <div>
            {!alwaysSendedEmail && <div>
                <div className={ styles.recoverPasswordMessage }>
                    <Text
                        as={ 'p' }
                        text={ 'Insira seu e-mail para que possarmos enviar um link de recuperação de senha.' }
                        color={ 'gray' }
                    />
                </div>
                <form onSubmit={ handleSubmit(recoveryPassword) }>
                    <Input.Field
                        control={ control }
                        placeholder={ 'seu@email.com' }
                        size={ '3' }
                        radius={ 'large' }
                        required
                        color={ 'blue' }
                        label={ 'Email' }
                        name={ 'email' }
                        id={ 'email' }
                        icon={ <EnvelopeClosedIcon/> }
                    />
                    <div className={ styles.buttonRecoverPasswordContainer }>
                        <Button
                            text={ 'Enviar' }
                            color={ 'blue' }
                            variant={ 'solid' }
                            size={ '3' }
                            radius={ 'medium' }
                            icon={ <ArrowRightIcon/> }
                            position={ 'right' }
                            type={ 'submit' }
                            animatedicon
                            loading={ loading || isSubmitting }
                        />
                    </div>
                </form>
            </div> }
            { alwaysSendedEmail && <div>
                <div className={ styles.recoverPasswordMessage }>
                    <Text
                        as={ 'p' }
                        text={ 'Caso a conta esteja registrada, você receberá um e-mail com um link de recuperação.' }
                        color={ 'gray' }
                    />
                </div>
            </div> }
        </div>
    );
}

export default function FormLogin() {
    const [recoveringPwd, setRecoveringPwd] = useState(false);
    const [sended, setSendedEmail] = useState(false);

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

    const api = useApi({ url: envs.API_URL });
    const { setUserToken } = useStore();

    const changeSetupRecoverPasswordModal = useCallback(() => {
        setSendedEmail(false);
        return setRecoveringPwd(!recoveringPwd);
    }, [recoveringPwd]);

    const setupRecoverPasswordModal = useCallback(() => {
        return (
            <WrapModal
                title={sended ? 'E-mail enviado!' : 'Recuperar senha'}
                open={recoveringPwd}
                onClose={changeSetupRecoverPasswordModal}
                children={<FormRecoverPwd setSended={setSendedEmail}/>}
                icon={sended && <CheckCircleIcon color={'green'}/>}
            />
        );
    }, [changeSetupRecoverPasswordModal, recoveringPwd, sended]);

    const { loading, call: loginUser } = useAsync(async (formData) => {
        const toastId = toast.loading('Acessando sua conta...');

        try {
            const { data } = await api.post('/login', {
                email: formData?.email,
                password: formData?.password,
            });

            setUserToken(data);
            dismissLoadingToast({
                toastId,
                type: 'success',
                message: 'Sucesso! Vamos te redirecionar para seu acesso.',
            });
        } catch (e) {
            dismissLoadingToast({
                toastId,
                type: 'error',
                message: 'Acesso inválido.',
            });
        }
    });

    return (
        <div>
            {setupRecoverPasswordModal()}
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
                        onClick={!isSubmitting ? changeSetupRecoverPasswordModal : null}
                        type={'button'}
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
