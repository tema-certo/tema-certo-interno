import { useCallback, useEffect, useMemo, useState } from 'react';

import Badge from '@/components/Badge';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { AvgRanking } from '@/helpers';
import useApi from '@/hooks/useApi';
import useAsync from '@/hooks/useAsync';
import useStore from '@/hooks/useStore';
import { StarIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

import styles from './WelcomeUser.module.css';


export default function WelcomeUser(callback, deps) {
    const user = useStore((state) => state.user);

    const CardStructureHtml = useCallback(() => {
        return (
            <div className={styles.containerCard}>
                <Text
                    text={'Nota média'}
                    size={'3'}
                />
                <Text
                    text={user?.averageScore || 0}
                    size={'9'}
                    isTitle
                />
                <Text
                    text={'de 1000 pontos'}
                    size={'1'}
                    classNames={styles.secondaryText}
                />
            </div>
        );
    }, [user?.averageScore]);

    const UserMemberSince = useCallback(() => {
        if (!user?.created_at) return '';

        return new Date(user.created_at).toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric',
        });
    }, [user]);

    const FindUserRanking = useCallback(() => {
        return AvgRanking.find(item => {
            if (item.betterThan) {
                return user?.averageScore >= item.value;
            }
            return user?.averageScore <= item.value;
        });
    }, [user?.averageScore]);

    return (
        <div className={styles.containerWelcomeUser}>
            <div className={styles.containerWelcomeMessage}>
                <Text
                    text={'Bem-vindo,'}
                    size={'4'}
                    color={'gray'}
		       />
                <Text
                    text={user?.name}
                    isTitle
                    size={'9'}
		       />
                <div className={styles.containerBadge}>
                    <Badge
                        text={FindUserRanking()?.label}
                        icon={<StarIcon/>}
                        radius={'full'}
                        color={FindUserRanking().color}
                        variant={'surface'}
                    />
                    <Text
                        text={`Membro desde ${UserMemberSince()}` }
                        size={'2'}
                        color={'gray'}
                    />
                </div>
            </div>
            <div className={styles.containerCardChanger}>
                <Card
                    variant={'ghost'}
                    html={<CardStructureHtml/>}
                    className={styles.card}
                    radius={'medium'}
		       />
            </div>
        </div>
    );
}
