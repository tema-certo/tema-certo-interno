import { useCallback, useMemo } from 'react';

import ButtonsEssayModal from '@/app/components/domains/ButtonsEssayModal';
import FinalBadgeHtmls from '@/app/components/domains/FinalBadgeHtmls';
import colors from '@/colors';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import EssaySelectorCard from '@/components/EssaySelectorCard';
import List from '@/components/List';
import { WrapModal } from '@/components/Modal';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { dismissLoadingToast, getEssayProps } from '@/helpers';
import useApi from '@/hooks/useApi';
import useSelector from '@/hooks/useEssaySelector';
import { BoxIcon, ClockIcon, FileTextIcon, Pencil1Icon, Pencil2Icon } from '@radix-ui/react-icons';
import { orderBy } from 'lodash/collection';
import { BuildingIcon, Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { toast } from 'sonner';

import styles from './EssayContainer.module.css';

export default function EssayContainer({
    essays,
    filters,
}) {
    const { onSelect, clearSelect, value: selectedEssay  } = useSelector();
    const router = useRouter();
    const api = useApi({ url: envs.API_URL });

    const { difficultyData } = getEssayProps(
        selectedEssay?.category,
        selectedEssay?.difficulty,
    );

    const filteredList = useMemo(() => {
        let list = [...essays];

        if (filters?.category) {
            list = list.filter(
                item => item?.classification?.category?.name === filters.category,
            );
        }

        if (filters?.difficulty) {
            list = list.filter(
                item => item?.classification?.difficulty_level?.level === filters.difficulty,
            );
        }

        if (filters?.orderBy) {
            switch (filters.orderBy) {
            case 'popular':
                list = orderBy(
                    list,
                    item => item?.total,
                    'desc',
                );
                break;

            case 'recent':
                list.sort(
                    (a, b) =>
                        new Date(b?.theme?.created_at).getTime() -
                            new Date(a?.theme?.created_at).getTime(),
                );
                break;
            default:
                break;
            }
        }

        return list;
    }, [essays, filters]);

    const ListItems = useMemo(() => {
        return [
            'Contador de palavras em tempo real',
            'Dicas de estrutura e argumentação',
            'Correção automática com IA ao finalizar',
        ];
    }, []);

    const {
        isFetching,
        refetch: refetchCreateTry,
    } = useQuery({
        queryKey: 'createTry',
        queryFn: async () => {
            const toastId = toast.loading('Iniciando redação...');

            try {
                const { data } = await api.post('/create-essay-try', {
                    essay_theme_id: selectedEssay?.id,
                });

                dismissLoadingToast({
                    toastId,
                    type: 'success',
                    message: 'Redação iniciada com sucesso!',
                });

                router.push(`/interno/redacao/${data?.id}`);
            } catch (e) {
                dismissLoadingToast({
                    toastId,
                    type: 'error',
                    message: 'Erro ao iniciar redação.',
                });
            }
        },
        enabled: false,
    });

    const HtmlInsideModal = useCallback(() => {
        if (isFetching) {
            return (
                <div className={styles.htmlInsideModalLoader}>
                    <TailSpin
                        color={colors['color-title-blue']}
                    />
                </div>
            );
        }

        return (
            <div className={styles.htmlInsideModal}>
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
                                icon={<BuildingIcon width={13} height={13} />}
                                color={'gray'}
                                type="1"
                                gapSize={'1'}
                                text={selectedEssay?.pedagogicalOrigin}
                            />
                        </Badge>
                        <Badge
                            text={difficultyData?.textConversion || 'Indefinida'}
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
                    onClick={refetchCreateTry}
                />
            </div>
        );
    }, [ListItems, clearSelect, difficultyData?.textConversion, isFetching, refetchCreateTry, selectedEssay]);

    return (
        <div className={styles.containerEssays}>
            <div className={styles.containerEssaysCards}>
                {filteredList.length <= 0 && (
                    <div className={styles.containerNoEssay}>
                        <Text
                            text={'Nenhum tema encontrado para o filtro específico. Tente alterar os filtros.'}
                            size={'3'}
                            color={'gray'}
                        />
                    </div>
                )}
                {filteredList.map((item) => (
                    <EssaySelectorCard
                        idEssay={item?.theme?.id}
                        title={item?.theme?.theme_title}
                        description={item?.theme?.theme_description}
                        pedagogicalOrigin={item?.classification?.pedagogical_origin?.institution_name}
                        essayFinishedCounter={item?.total}
                        difficulty={item?.classification?.difficulty_level?.level}
                        category={item?.classification?.category?.name}
                        imageEndpoint={item?.theme?.image_endpoint}
                        onSelect={onSelect}
                        filters={filters}
                    />
                ))}
            </div>

            <WrapModal
                open={!!selectedEssay}
                title="Iniciar Redação"
                onClose={clearSelect}
            >
                {selectedEssay && (
                    <>
                        <HtmlInsideModal/>
                    </>
                )}
            </WrapModal>
        </div>
    );
}
