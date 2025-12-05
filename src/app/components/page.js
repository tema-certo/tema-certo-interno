'use client';

import './components.css';
import { useCallback, useState } from 'react';

import EssayContainer from '@/app/components/domains/EssayContainer';
import Button from '@/components/Button';
import EssaySelectorCard from '@/components/EssaySelectorCard';
import Input from '@/components/Input';
import { WrapModal } from '@/components/Modal';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Box } from '@radix-ui/themes';


export default function Page() {
    return (
        <div className="containerPageComponent">
            <Box maxWidth={'300px'}>
                <Input
                    icon={<MagnifyingGlassIcon width={24} height={22} />}
                    size={'2'}
                    side={'left'}
                    radius={'large'}
                    color={'blue'}
                    placeholder={'Buscar temas'}
                />
            </Box>
            <div className="flex gap-10 flex-1 flex-wrap justify-center items-center">
                <EssayContainer/>
            </div>
        </div>
    );
}
