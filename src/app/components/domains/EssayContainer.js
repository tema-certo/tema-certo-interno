import { useCallback, useMemo } from 'react';

import ButtonsEssayModal from '@/app/components/domains/ButtonsEssayModal';
import FinalBadgeHtmls from '@/app/components/domains/FinalBadgeHtmls';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import EssaySelectorCard from '@/components/EssaySelectorCard';
import List from '@/components/List';
import { WrapModal } from '@/components/Modal';
import Text from '@/components/Text';
import { getEssayProps } from '@/helpers';
import useSelector from '@/hooks/useEssaySelector';
import { BoxIcon, ClockIcon, FileTextIcon, Pencil1Icon, Pencil2Icon } from '@radix-ui/react-icons';

import styles from './EssayContainer.module.css';

export default function EssayContainer() {
    const { onSelect, clearSelect, value: selectedEssay  } = useSelector();

    const { difficultyData, definedTime } = getEssayProps(
        selectedEssay?.category,
	    selectedEssay?.difficulty,
	    selectedEssay?.definedTime,
    );

    const ListItems = useMemo(() => {
        return ['Contador de palavras em tempo real',
            'Dicas de estrutura e argumentação',
            'Correção automática com IA ao finalizar'];
    }, []);


    const onClick = useCallback(() => {
        // TODO: Fazer lógica de criação de tentativa
        // eslint-disable-next-line no-console
        return console.log('ok');
    }, []);

    const HtmlInsideModal = useCallback(() => {
        return (
            <div className="flex flex-col gap-4">
                <span className="text-sm text-gray-500">
                    Você está prestes a começar uma redação sobre o tema selecionado.
                </span>
                <div className={styles.badgeContainerModal}>
                    <Badge
                        text={<FinalBadgeHtmls selectedEssay={selectedEssay}/>}
                        variant={'surface'}
                        color={'blue'}
                        className={styles.badgeInternal}
                    >
                    </Badge>
                    <div className={styles.badgeExtraContainerModal}>
                        <Badge
                            radius={'full'}
                            variant={'surface'}
                            color={'gray'}
                            ishtml
		                >
                            <Text
                                as="div"
                                icon={<ClockIcon width={13} height={13} />}
                                color={'gray'}
                                type="1"
                                gapSize={1}
                                text={`${definedTime} min.`|| 'Tempo indefinido'}
	                        />
                        </Badge>
                        <Badge
                            text={difficultyData?.textConversion || 'Dificuldade indefinida'}
                            radius={'full'}
                            variant={'surface'}
                            color={'gray'}
		                />
                    </div>
                </div>
                <div className={styles.listContainerDiv}>
                    <List
                        title={'Ao prosseguir, você terá acesso ao editor de redação com: '}
                        items={ListItems}
                        className={styles.listContainer}
                    />
                </div>
                <ButtonsEssayModal
                    onCancel={clearSelect}
                    onClick={onClick}
                />
            </div>
        );
    }, [ListItems, clearSelect, definedTime, difficultyData?.textConversion, onClick, selectedEssay]);

    return (
        <div>
            <EssaySelectorCard
                title={'Molodoooooooy Yekindaaaaaaaaar MajorrrrrrrrrDDrrr'}
                difficulty={'easy'}
                category={'politics'}
                definedTime={120}
                description={'Molodoooooooy YekindaaaaaaaaaD WQSQWDDSDDDDDD DDDDDDDDDDDDDDDDDDDDQWDLPOQWKD0OIQWKDOIPQWKDPOWQKDPOWQK DPOQWK DOPKQWOPD KQWPOD KQWOPDK PQWOKD POQWK DPOQWK DOPQWKDOP QWKOPKQW DPOKQWDOPKQWDr'}
                essayFinishedCounter={232094}
                imgSrc={'https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'}
                onSelect={onSelect}
            />

            <WrapModal
                open={!!selectedEssay}
                title="Iniciar Redação"
                onClose={clearSelect}
            >
                {selectedEssay && (
                    <>
                        <HtmlInsideModal />
                    </>
                )}
            </WrapModal>
        </div>
    );
}
