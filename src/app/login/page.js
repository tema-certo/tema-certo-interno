'use client';

import { useCallback, useState } from 'react';

import LocationHandler from '@/app/login/domains/LocationHandler';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Text from '@/components/Text';
import Icons from '@/icons/icons';
import { Separator } from '@radix-ui/themes';

import styles from './login.module.css';


export default function Page() {
    const [title, setTitleValue] = useState('');

    const setTitle = useCallback((v) => {
        return setTitleValue(v);
    }, []);

    const modalFinalSeparator = useCallback(() => {
        return (
            <div className={styles.finalLogin}>
                <Text.Separator
                    size={'1'}
                    text={'OU COM'}
                    color={'gray'}
                />
                <Button
                    text={'Google'}
                    icon={<Icons.GoogleIcon width={16} height={16} />}
                    gapIcon={'4'}
                    size={'3'}
                    color={'gray'}
                    variant={'surface'}
                    classnames={styles.btnGoogle}
                />
            </div>
        );
    }, []);

    return (
        <Container>
            <main className={styles.loginContainer}>
                <img
                    src="/tema-certo-black.svg"
                    alt="Logo do Tema Certo"
                    width={120}
                    height={120}
		            />
                <Text text={'Sua plataforma de redações.'} size={'2'} color={'gray'} />
                <Card
                    title={title || 'Login'}
                    html={<LocationHandler setTitle={setTitle} />}
                    minW={'20px'}
                    maxW={'460px'}
                    aligntitle={'center'}
                    basecontent={modalFinalSeparator()}
                />

            </main>
        </Container>
    );
}
