
import { useCallback } from 'react';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { envs } from '@/envs';
import { getEssayProps } from '@/helpers';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { ChevronRightIcon, ClockIcon, FileTextIcon } from '@radix-ui/react-icons';
import { Box, Card, Inset, Separator, Flex } from '@radix-ui/themes';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import styles from './EssaySelectorCard.module.css';

export default function EssaySelectorCard({
    idEssay,
    title,
    description,
    definedTime,
    essayFinishedCounter,
    category,
    difficulty,
    imageEndpoint,
    onSelect,
}) {
    const api = useApi({ url: envs.APP_CDN, denyToken: true });
    const { isMobile, isTablet, isLowerMobile } = useSize();

    const parsedEssayData = {
        id: idEssay,
        title,
        description,
        category,
        difficulty,
        definedTime,
    };

    const { data: img } = useQuery({
        queryKey: ['img', imageEndpoint],
        queryFn: async () => {
            if (imageEndpoint) {
                const imageFound = await api.get(imageEndpoint, { responseType: 'blob' });

                if (imageFound?.data) {
                    return URL.createObjectURL(imageFound.data);
                }

                return null;
            }

            return null;
        },
        enabled: !!imageEndpoint,
        retry: false,
    });

    const { difficultyData, categoryData } = getEssayProps(category, difficulty, definedTime);

    const selectEssay = useCallback((data) => {
        return () => onSelect(data);
    }, [onSelect]);

    const minW =
        isLowerMobile ? '320px' :
            isMobile ? '280px' :
                isTablet ? '310px' :
                    '280px';

    const renderImage = useCallback(() => {
        if (!img && imageEndpoint) {
            return (
                <Inset clip="padding-box" side="top" pb="current">
                    <div className={styles.image} />
                </Inset>
            );
        }

        if (img) {
            return (
                <Inset clip="padding-box" side="top" pb="current">
                    <img
                        src={img}
                        alt="Imagem correspondente à redação."
                        className={styles.image}
                    />
                </Inset>
            );
        }

        return null;
    }, [imageEndpoint, img]);

    return (
        <Box minWidth={minW} maxWidth="310px">
            <Card className={styles.card} variant={'ghost'} onClick={selectEssay(parsedEssayData)}>
                {renderImage()}
                <div className={styles.content}>
                    <div className={styles.badgeContainer}>
                        <Badge
                            text={categoryData?.textConversion || 'Dif. Indefinida'}
                            radius={'full'}
                            variant={'surface'}
                            color={categoryData?.color || 'gray'}
                        />
                        <Badge
                            text={getEssayProps(category, difficulty).difficultyData?.textConversion ||
                                parsedEssayData?.difficulty ||
                                'Cat.' + ' Indefinida'
                            }
                            radius={'full'}
                            variant={'surface'}
                            color={difficultyData?.color || 'gray'}
                        />
                    </div>
                    <div className={styles.container}>
                        <Text
                            text={title}
                            as="h1"
                            size="4"
                            weight="bold"
                            className={styles.title}
                            isTitle
                        />
                        <Text
                            text={description}
                            as="div"
                            color="gray"
                            size="2"
                        />
                    </div>
                    <div className={styles.separator}>
                        <Separator my="3" size="4" />
                        <Flex gap="2">
                            <Text
                                as="div"
                                icon={<ClockIcon width={13} height={13} />}
                                color={'gray'}
                                type="1"
                                gapSize={1}
                                text={`${definedTime || 0} min.`|| 'Tempo indefinido'}
                            />
                            <Text
                                as="div"
                                icon={<FileTextIcon width={13} height={13} />}
                                color={'gray'}
                                type="1"
                                gapSize={1}
                                text={`${essayFinishedCounter || 0}`}
                            />
                        </Flex>
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button
                            text={'Realizar redação'}
                            icon={<ChevronRightIcon className="iconArrow" />}
                            position={'right'}
                            variant={'ghost'}
                            radius={'full'}
                            color={'blue'}
                            classnames={styles.btnChange}
                        />
                    </div>
                </div>
            </Card>
        </Box>
    );
}

EssaySelectorCard.PropTypes = {
    essayTitle: PropTypes.string,
    description: PropTypes.string,
    definedTime: PropTypes.number,
    essayFinishedCounter: PropTypes.number,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    imgSrc: PropTypes.string,
    onSelect: PropTypes.func,
};
