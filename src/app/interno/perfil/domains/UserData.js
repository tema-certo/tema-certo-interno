'use client';

import { useCallback, useState } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Text from '@/components/Text';
import useStore from '@/hooks/useStore';
import { EnvelopeClosedIcon, PersonIcon } from '@radix-ui/react-icons';
import { Avatar, Separator } from '@radix-ui/themes/dist/esm';
import { CheckIcon, PencilIcon, SquarePenIcon } from 'lucide-react';
import { Form, useForm } from 'react-hook-form';

import styles from './UserData.module.css';

export default function UserData() {
    const [editing, setEditing] = useState(false);
    const user = useStore((state) => state.user);

    const {
        control,
        formState: { isSubmitting },
    } = useForm({
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
    });

    const handleEditing = useCallback(() => {
        return () => setEditing(!editing);
    }, [editing]);

    const renderUserInfo = useCallback(() => {
        const memberSince = new Date(user?.created_at).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        });

        return (
            <div>
                <div className={styles.containerUserData}>
                    <div className={styles.containerAvatar}>
                        <Avatar
                            radius={'full'}
                            variant={'solid'}
                            fallback={user?.name?.charAt(0)}
                            color={'blue'}
                            size={'6'}
                            className={styles.avatar}
                        />
                        <div className={styles.containerInfo}>
                            <div className={styles.containerValues}>
                                <Text
                                    text={user?.name}
                                    size={'8'}
                                    isTitle
                                />
                                <Text
                                    text={`Membro desde ${memberSince}`}
                                    size={'3'}
                                    color={'gray'}
                                />
                            </div>
                            <div>
                                <Button
                                    text={!editing ? 'Editar' : 'Salvar'}
                                    variant={!editing ? 'outline' : 'solid'}
                                    color={!editing ? 'gray' : 'blue'}
                                    icon={!editing ? <SquarePenIcon width={16} height={16} /> : <CheckIcon width={16} height={16} />}
                                    size={'3'}
                                    onClick={handleEditing()}
                                />
                            </div>
                        </div>
                    </div>
                    <Separator
                        className={styles.separator}
                        my="2"
                        size="4"
                    />
                </div>
            </div>
        );
    }, [user?.created_at, user?.name, editing, handleEditing]);

    const userForm = useCallback(() => {
        return (
            <div>
                <div>
                    <form
                        className={styles.userForm}
                    >
                        <div>
                            <div className={styles.userFormTop}>
                                <Input.Field
                                    control={control}
                                    placeholder={'Seu nome'}
                                    size={'3'}
                                    radius={'large'}
                                    required
                                    color={'blue'}
                                    value={user?.name}
                                    label={'Nome completo'}
                                    name={'name'}
                                    id={'name'}
                                    disabled={isSubmitting || !editing}
                                    icon={<PersonIcon/>}
                                />
                            </div>
                            <Input.Field
                                control={control}
                                placeholder={'Seu telefone'}
                                size={'3'}
                                radius={'large'}
                                required
                                color={'blue'}
                                label={'Telefone'}
                                name={'telephone'}
                                id={'telephone'}
                                disabled={isSubmitting || !editing}
                                icon={<EnvelopeClosedIcon/>}
                            />
                        </div>
                        <div>
                            <div className={styles.userFormTop}>
                                <Input.Field
                                    control={control}
                                    placeholder={'Seu email'}
                                    size={'3'}
                                    radius={'large'}
                                    required
                                    color={'blue'}
                                    label={'Email'}
                                    name={'email'}
                                    id={'email'}
                                    disabled={isSubmitting || !editing}
                                />
                            </div>
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
                                disabled={isSubmitting || !editing}
                            />
                        </div>
                    </form>
                    <Separator
                        className={styles.separator}
                        my="2"
                        size="4"
                    />
                </div>
            </div>
        );
    }, [control, editing, isSubmitting, user?.name]);

    return (
        <div className={styles.animation}>
            {renderUserInfo()}
            {userForm()}
        </div>
    );
}
