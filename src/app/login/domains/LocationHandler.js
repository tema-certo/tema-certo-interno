import { useCallback, useState } from 'react';

import FormLogin from '@/app/login/domains/FormLogin';
import FormRegister from '@/app/login/domains/FormRegister';
import Text from '@/components/Text';
import { Box, Tabs } from '@radix-ui/themes';

import styles from './LocationHandler.module.css';

const tabs = [
    {
        value: 'login',
        label: 'Login',
        description: 'Acesse sua conta para continuar',
    },
    {
        value: 'register',
        label: 'Criar conta',
        description: 'Preencha os dados para se cadastrar',
    },
];

export default function LocationHandler({ setTitle }) {
    const [selectedTab, setSelectedTab] = useState('login');

    const handleTabChange = useCallback((v) => {
        const tabContent = tabs.find((it) => it.value === v);
        setTitle(tabContent?.label);
        setSelectedTab(v);
    }, [setTitle]);

    const currentTabInfo = tabs.find(t => t.value === selectedTab);

    return (
        <Tabs.Root value={selectedTab} onValueChange={handleTabChange}>

            <Text
                text={currentTabInfo?.description}
                as="p"
                color="gray"
                size="2"
                className={styles.description}
            />

            <Tabs.List justify="center" size="2" className={styles.rootTabs}>
                <Tabs.Trigger value="login">Login</Tabs.Trigger>
                <Tabs.Trigger value="register">Registrar</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="login">
                    <FormLogin/>
                </Tabs.Content>

                <Tabs.Content value="register">
                    <FormRegister/>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
}
