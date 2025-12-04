'use client';

import './components.css';
import { useCallback, useState } from 'react';

import EssaySelectorCard from '@/components/EssaySelectorCard';
import { WrapModal } from "@/components/Modal";
import Button from "@/components/Button";


export default function Page() {
    const [selectedEssay, setSelectedEssay] = useState({});

    const onSelect = useCallback((essay) => {
        return setSelectedEssay(essay);
    }, []);

    return (
        <div className="containerPageComponent">
            <div className="flex gap-10 flex-1 flex-wrap justify-center items-center">
                <EssaySelectorCard
                    essayTitle={'A educação mockada na austrália'}
                    difficulty={'easy'}
                    category={'politics'}
                    definedTime={120}
                    description={'Redação mockada para teste de componente. Clicável para iniciar redação.'}
                    essayFinishedCounter={232094}
                    imgSrc={'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'}
                    onSelect={onSelect}
                />
                <WrapModal
                    open={!!selectedEssay}
                    title="Iniciar Redação"
                    onClose={() => setSelectedEssay(null)}
                >
                    {selectedEssay && (
                        <>
                            <p>Título: {selectedEssay.essayTitle}</p>
                            <p>Categoria: {selectedEssay.category}</p>
                        </>
                    )}
                </WrapModal>
            </div>
        </div>
    );
}
