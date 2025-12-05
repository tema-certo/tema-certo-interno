import './EssaySelectorCard.css';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { getEssayProps } from '@/helpers';
import { ChevronRightIcon, ClockIcon, FileTextIcon } from '@radix-ui/react-icons';
import { Box, Card, Inset, Separator, Flex } from '@radix-ui/themes';
import PropTypes from 'prop-types';

export default function EssaySelectorCard({
    title,
    description,
    definedTime,
    essayFinishedCounter,
    category,
    difficulty,
    imgSrc,
    onSelect,
}) {
    const parsedEssayData = {
        id: 234,
        title,
        description,
        category,
        difficulty,
        definedTime,
    };

    const { difficultyData, categoryData } = getEssayProps(category, difficulty, definedTime);

    return (
        <Box minWidth="20   0px" maxWidth="365px" className="defaultContainer">
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
                            text={getEssayProps(category, difficulty).difficultyData?.textConversion || 'Dificuldade indefinida'}
                            radius={'full'}
                            variant={'surface'}
                            color={difficultyData?.color || 'gray'}
                        />
                    </div>
                    <div className="container">
                        <Text
                            text={title}
                            as="h1"
                            size="4"
                            weight="bold"
                            className={'title'}
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
