import './EssaySelectorCard.css';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { ChevronRightIcon, ClockIcon, FileTextIcon } from '@radix-ui/react-icons';
import { Box, Card, Inset, Separator, Flex } from '@radix-ui/themes';
import PropTypes from 'prop-types';

const badgeDifficultyColorDefiner = [
    {
        identifier: 'easy',
        textConversion: 'Fácil',
        color: 'green',
    },
    {
        identifier: 'medium',
        textConversion: 'Médio',
        color: 'yellow',
    },
    {
        identifier: 'hard',
        textConversion: 'Difícil',
        color: 'red',
    },
];

const badgeCategoryColorDefiner = [
    {
        identifier: 'education',
        textConversion: 'Educação',
        color: 'green',
    },
    {
        identifier: 'politics',
        textConversion: 'Política',
        color: 'yellow',
    },
    {
        identifier: 'economy',
        textConversion: 'Economia',
        color: 'blue',
    },
    {
        identifier: 'social',
        textConversion: 'Problemas sociais',
        color: 'gold',
    },
    {
        identifier: 'technology',
        textConversion: 'Tecnologia',
        color: 'purple',
    },
    {
        identifier: 'health',
        textConversion: 'Saúde',
        color: 'red',
    },
    {
        identifier: 'environment',
        textConversion: 'Meio ambiente',
        color: 'grass',
    },
];

export default function EssaySelectorCard({
    essayTitle,
    description,
    definedTime,
    essayFinishedCounter,
    category,
    difficulty,
    imgSrc,
    onSelect,
}) {
    const difficultyData = badgeDifficultyColorDefiner.find(item => {
        return item.identifier === difficulty;
    });

    const categoryData = badgeCategoryColorDefiner.find(item => {
        return item.identifier === category;
    });

    const parsedEssayData = {
        id: 234,
        essayTitle,
        description,
        category,
        difficulty,
    };

    return (
        <Box minWidth="320px" maxWidth="365px" className="defaultContainer">
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Card className="card" variant={'ghost'} onClick={() => onSelect(parsedEssayData)}>
                { imgSrc && (
                    <Inset clip="padding-box" side="top" pb="current">
                        <img
                            src={imgSrc}
                            alt="Imagem correspondente à redação."
                            className="image"
                        />
                    </Inset>
                )}
                <div className="content">
                    <div className="badge-container">
                        <Badge
                            text={categoryData?.textConversion || 'Categoria indefinida'}
                            radius={'full'}
                            variant={'surface'}
                            color={categoryData?.color || 'gray'}
                        />
                        <Badge
                            text={difficultyData?.textConversion || 'Dificuldade indefinida'}
                            radius={'full'}
                            variant={'surface'}
                            color={difficultyData?.color || 'gray'}
                        />
                    </div>
                    <div className="container">
                        <Text
                            text={essayTitle}
                            as="h1"
                            size="4"
                            weight="bold"
                            classnames={'title'}
                            isTitle
                        />
                        <Text
                            text={description}
                            as="div"
                            color="gray"
                            size="2"
                        />
                    </div>
                    <div className="separator">
                        <Separator my="3" size="4" />
                        <Flex gap="2">
                            <Text
                                as="div"
                                icon={<ClockIcon width={13} height={13} />}
                                color={'gray'}
                                type="1"
                                gapSize={1}
                                text={`${definedTime} min.`|| 'Tempo indefinido'}
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
                    <div className="button-container">
                        <Button
                            text={'Realizar redação'}
                            icon={<ChevronRightIcon className="iconArrow" />}
                            position={'right'}
                            variant={'ghost'}
                            radius={'full'}
                            color={'blue'}
                            classnames={'btn-change'}
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
