'use client';

import { useCallback, useMemo, useState } from 'react';

import colors from '@/colors';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Text from '@/components/Text';
import ToggleGroup from '@/components/ToggleGroup';
import { badgeCategoryColorDefiner } from '@/helpers';
import useSize from '@/hooks/useSize';
import { ClockIcon, MagnifyingGlassIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@radix-ui/themes';
import lodash from 'lodash';
import {
    BlocksIcon, Building,
    Calendar1Icon, FilterXIcon,
    GridIcon,
    HardDriveIcon,
    HardHatIcon,
    ListIcon, SlidersHorizontalIcon,
    StarsIcon,
    TrendingUp,
} from 'lucide-react';

import styles from './Filters.module.css';


export default function Filters({
    data,
    filters,
    changeFilters,
}) {
    const { isLowerMobile } = useSize();
    const [rapidFilters, setCloseRapidFilters] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    const rapidFiltersPossibilites = useMemo(() => {
        const date = new Date();

        return [
            {
                label: 'Fácil',
                value: 'easy',
            },
            {
                label: 'ENEM',
                value: 'enem',
            },
            {
                label: date.getFullYear(),
                value: date.getFullYear(),
                changeDate: true,
            },
        ];
    }, []);

    const orderByOptions = useMemo(() => {
        return [
            {
                label: 'Mais recentes',
                value: 'recent',
                icon: <Calendar1Icon />,
            },
            {
                label: 'Mais populares',
                value: 'popular',
                icon: <TrendingUp />,
            },
            {
                label: 'Mais difíceis',
                value: 'difficult',
                icon: <HardHatIcon />,
            },
        ];
    }, []);

    const changeCategory = useCallback((category) => {
        return () => {
            changeFilters({
                ...filters,
                category,
            });
        };
    }, [changeFilters, filters]);

    const changeOtherFilters = useCallback((filter, close) => {
        return () => {
            if (close) {
                setCloseRapidFilters(false);
            }

            changeFilters({
                ...filters,
                [filter]: !filters[filter],
            });
        };
    }, [changeFilters, filters]);

    const changeVisualization = useCallback((visualization) => {
        changeFilters({
            ...filters,
            visualization,
        });
    }, [filters, changeFilters]);

    const changeOrderBy = useCallback((newOrder) => {
        changeFilters({
            ...filters,
            orderBy: newOrder,
        });
    }, [changeFilters, filters]);

    const handleShowFilters = useCallback((value) => {
        return () => setShowFilters(!value);
    }, []);

    const FilterBadgeCategories = useCallback(() => {
        const uniqByName = lodash.uniqBy(data, 'classification.category.name');

        const isAllSelected = !filters?.category;

        return (
            <>
                <Button
                    key="all"
                    variant={isAllSelected ? 'solid' : 'surface'}
                    color={isAllSelected ? 'blue' : 'gray'}
                    radius="full"
                    size="3"
                    onClick={changeCategory(undefined)}
                    classnames={isAllSelected ? styles.selected : styles.defaultButtonBadge}
                >
                    <div className={styles.buttonBadge}>
                        <Text
                            text={'Todos'}
                            color={isAllSelected ? 'white' : 'black'}
                            bold
                        />
                    </div>
                </Button>

                {uniqByName.map((item, _) => {
                    const categoryName = item?.classification?.category?.name;
                    if (!categoryName) return null;

                    const nameConverted = badgeCategoryColorDefiner.find(
                        itemExtra => itemExtra.identifier === categoryName,
                    );

                    const isSelected = filters?.category === categoryName;

                    return (
                        <Button
                            key={categoryName}
                            variant={isSelected ? 'solid' : 'surface'}
                            color={isSelected ? 'blue' : 'gray'}
                            radius="full"
                            size="3"
                            onClick={changeCategory(categoryName)}
                            classnames={isSelected ? styles.selected : styles.defaultButtonBadge}
                        >
                            <div className={styles.buttonBadge}>
                                <Text
                                    text={nameConverted?.textConversion}
                                    size={'2'}
                                    color={isSelected ? 'white' : 'black'}
                                    bold
                                />
                            </div>
                        </Button>
                    );
                })}
            </>
        );
    }, [data, filters?.category, changeCategory]);

    const RapidFilters = useCallback(() => {
        return rapidFiltersPossibilites.map(item => {
            return (
                <Button
                    key={item.value}
                    variant={'surface'}
                    color={'gray'}
                    radius="full"
                    size="2"
                    onClick={changeOtherFilters(item?.value, true)}
                    classnames={styles.defaultButtonBadge}
                >
                    <div className={styles.buttonBadge}>
                        <Text
                            text={item?.label}
                            size={'2'}
                            color={'black'}
                            bold
                        />
                    </div>
                </Button>
            );
        });
    }, [changeOtherFilters, rapidFiltersPossibilites]);

    const ToggleVisualization = useCallback(() => {
        return (
            <ToggleGroup
                type="single"
                className={styles.toggleContainer}
                defaultValue={'grid'}
                value={filters?.visualization}
                /* eslint-disable-next-line react/jsx-no-bind */
                onValueChange={(value) => {
                    if (!value) return null;
                    changeVisualization(value);
                }}
            >
                <ToggleGroup.Item
                    value="grid"
                    position={'left'}
                >
                    <GridIcon width={20} height={18}/>
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="list"
                    position={'right'}
                >
                    <ListIcon width={20} height={18}/>
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    }, [changeVisualization, filters?.visualization]);

    const FilterOptions = useCallback(() => {
        return (
            <div>
                <div className={styles.filtersSelectors}>
                    <Select
                        label={'Selecione um ano'}
                        options={orderByOptions}
                        position={'left'}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeOrderBy(value);
                        }}
                        labelIcon={<Calendar1Icon width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Ano'}
                    />
                    <Select
                        label={'Selecione uma instituição'}
                        options={orderByOptions}
                        position={'left'}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeOrderBy(value);
                        }}
                        labelIcon={<Building width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Ano'}
                    />
                    <Select
                        label={'Selecione uma dificuldade'}
                        options={orderByOptions}
                        position={'left'}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeOrderBy(value);
                        }}
                        labelIcon={<HardHatIcon width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Ano'}
                    />
                </div>
            </div>
        );
    }, [changeOrderBy, orderByOptions]);

    return (
        <div>
            <div className={styles.containerFilters}>
                <div className={styles.containerFiltersContent}>
                    <div className={styles.searchRow}>
                        {rapidFilters && (
                            <div className={styles.rapidFilters}>
                                <Text
                                    text={'Filtros rápidos'}
                                    size={'2'}
                                    color={'gray'}
                                    icon={<StarsIcon width={16} height={16}/>}
                                />
                                <RapidFilters/>
                            </div>
                        )}
                        <div className={styles.filterOptions}>
                            <Button
                                text={'Filtros'}
                                variant={'surface'}
                                color={'gray'}
                                radius={'large'}
                                size={'4'}
                                icon={<SlidersHorizontalIcon
                                    width={16}
                                    height={16}
                                    color={colors['color-black-default']}
                                />}
                                classnames={styles.filterBtn}
                                onClick={handleShowFilters(showFilters)}
                            />
                            <Select
                                label={'Ordenar por'}
                                options={orderByOptions}
                                position={'left'}
                                labelIcon={<ClockIcon color={colors['color-black-default']}/>}
                                /* eslint-disable-next-line react/jsx-no-bind */
                                onValueChange={(value) => {
                                    if (!value) return null;

                                    changeOrderBy(value);
                                }}
                            />
                            {!isLowerMobile && <ToggleVisualization/>}
                        </div>
                    </div>
                    {showFilters && (
                        <div className={styles.extraFilters}>
                            <Card
                                html={<FilterOptions/>}
                                className={styles.cardFilters}
                                noBorder
                            />
                        </div>
                    )}
                </div>
                <div className={styles.containerBadges}>
                    <Text
                        text={'Categorias'}
                        size={'2'}
                        color={'gray'}
                        icon={<BlocksIcon width={16} height={16}/>}
                    />
                    <FilterBadgeCategories/>
                </div>
            </div>
        </div>
    );
}
