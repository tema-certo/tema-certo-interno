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
import { envs } from '@/envs';
import { badgeCategoryColorDefiner, startFilterArray } from '@/helpers';
import useApi from '@/hooks/useApi';
import useSize from '@/hooks/useSize';
import { ClockIcon, MagnifyingGlassIcon, PlusCircledIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Skeleton } from '@radix-ui/themes';
import { Separator } from '@radix-ui/themes/dist/esm';
import lodash from 'lodash';
import {
    BlocksIcon, Building,
    Calendar1Icon, Circle, FilterXIcon,
    GridIcon,
    HardDriveIcon,
    HardHatIcon,
    ListIcon, SlidersHorizontalIcon,
    StarsIcon,
    TrendingUp,
} from 'lucide-react';
import { useQuery } from 'react-query';

import styles from './Filters.module.css';


export default function Filters({
    data,
    filters,
    changeFilters,
}) {
    const { isLowerMobile } = useSize();
    const api = useApi({ url: envs.API_URL });

    const [rapidFilters, setCloseRapidFilters] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

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
        ];
    }, []);

    const optionsDifficulty = useMemo(() => {
        return [
            {
                label: 'Fácil',
                value: 'Easy',
            },
            {
                label: 'Médio',
                value: 'Medium',
            },
            {
                label: 'Difícil',
                value: 'Hard',
            },
        ];
    }, []);

    const optionsYears = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 2000;

        return Array.from(
            { length: currentYear - startYear + 1 },
            (_, index) => {
                const year = currentYear - index;

                return {
                    label: year.toString(),
                    value: year.toString(),
                };
            },
        );
    }, []);

    const {
        data: classificationPossibilities,
        isLoading,
    } = useQuery({
        queryKey: ['classificationPossibilities'],
        queryFn: async () => {
            const { data } = await api.get('/classification-possibilities');
            return data;
        },
        enabled: true,
        staleTime: Infinity,
    });

    const optionsInstitutions = useMemo(() => {
        if (!classificationPossibilities) return [];

        return classificationPossibilities.map(item => ({
            label: item.label,
            value: item.institution_name,
        }));
    }, [classificationPossibilities]);

    const changeFilterCommon = useCallback((filter, value) => {
        if (filters[filter] === value) return null;

        return changeFilters({
            ...filters,
            [filter]: value,
        });
    }, [changeFilters, filters]);

    const clearAllFilters = useCallback(() => {
        return changeFilters({});
    }, [changeFilters]);

    const rapidFiltersPossibilites = useMemo(() => {
        const date = new Date();

        return [
            {
                label: 'Fácil',
                value: 'easy',
                handleClick: () => changeFilterCommon('difficulty', 'Easy'),
            },
            {
                label: 'ENEM',
                value: 'enem',
                handleClick: () => changeFilterCommon('institution', 'ENEM'),
            },
            {
                label: date.getFullYear(),
                value: date.getFullYear(),
                changeDate: true,
                handleClick: () => changeFilterCommon('year', date.getFullYear().toString()),
            },
        ];
    }, [changeFilterCommon]);

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
                    /* eslint-disable-next-line react/jsx-no-bind */
                    onClick={() => changeFilterCommon('category', null)}
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

                    const nameConvertedArr = startFilterArray(badgeCategoryColorDefiner)
                        .where('identifier', '=', categoryName)
                        .take();

                    const nameConverted = nameConvertedArr[0];

                    const isSelected = filters?.category === categoryName;

                    return (
                        <Button
                            key={categoryName}
                            variant={isSelected ? 'solid' : 'surface'}
                            color={isSelected ? 'blue' : 'gray'}
                            radius="full"
                            size="3"
                            /* eslint-disable-next-line react/jsx-no-bind */
                            onClick={() => changeFilterCommon('category', categoryName)}
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
    }, [data, filters?.category, changeFilterCommon]);

    const RapidFilters = useCallback(() => {
        return rapidFiltersPossibilites.map(item => {
            return (
                <Button
                    key={item.value}
                    variant={'surface'}
                    color={'gray'}
                    radius="full"
                    size="2"
                    classnames={styles.defaultButtonBadge}
                    onClick={item?.handleClick}
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
    }, [rapidFiltersPossibilites]);

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

                    changeFilterCommon('visualization', value);
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
    }, [changeFilterCommon, filters?.visualization]);

    const FilterOptions = useCallback(() => {
        return (
            <div>
                <div className={styles.filtersSelectors}>
                    <Select
                        label={'Selecione um ano'}
                        options={optionsYears}
                        position={'left'}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeFilterCommon('year', value);
                        }}
                        value={filters?.year}
                        labelIcon={<Calendar1Icon width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Ano'}
                    />
                    <Select
                        label={'Selecione uma instituição'}
                        options={optionsInstitutions}
                        position={'left'}
                        value={filters?.institution}
                        loading={isLoading}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeFilterCommon('institution', value);
                        }}
                        labelIcon={<Building width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Instituição'}
                    />
                    <Select
                        label={'Selecione uma dificuldade'}
                        options={optionsDifficulty}
                        value={filters?.difficulty}
                        position={'left'}
                        /* eslint-disable-next-line react/jsx-no-bind */
                        onValueChange={(value) => {
                            if (!value) return null;

                            changeFilterCommon('difficulty', value);
                        }}
                        labelIcon={<HardHatIcon width={16} height={16} color={colors['color-black-default']}/>}
                        uiLabel={'Dificuldade'}
                    />
                    <Separator my="3" size="4" />
                    <div className={styles.legendDifficulty}>
                        <Text
                            text={'Legenda de dificuldade:'}
                            color={'gray'}
                            size={'2'}
                        />
                        <Text
                            text={'Fácil'}
                            icon={<Circle
                                fill={colors['color-green-default']}
                                color={colors['color-green-default']}
                                width={12}
                                size={'2'}
                                height={12}/>}
                        />
                        <Text
                            text={'Médio'}
                            icon={<Circle
                                fill={colors['color-yellow-default']}
                                color={colors['color-yellow-default']}
                                width={12}
                                size={'2'}
                                height={12}/>}
                        />
                        <Text
                            text={'Difícil'}
                            icon={<Circle
                                fill={colors['color-red-default']}
                                color={colors['color-red-default']}
                                width={12}
                                size={'2'}
                                height={12}/>}
                        />
                    </div>
                </div>
            </div>
        );
    }, [optionsYears, filters?.year, filters?.institution, filters?.difficulty,
        optionsInstitutions, isLoading, optionsDifficulty, changeFilterCommon]);

    const filtersOptionsMap = useMemo(() => ({
        difficulty: optionsDifficulty,
        year: optionsYears,
        institution: optionsInstitutions,
        orderBy: orderByOptions,
        visualization: [
            { label: 'Grid', value: 'grid' },
            { label: 'Lista', value: 'list' },
        ],
        category: data?.map(item => ({
            label: badgeCategoryColorDefiner.find(i => i.identifier === item?.classification?.category?.name)?.textConversion,
            value: item?.classification?.category?.name,
        })) ?? [],
    }), [
        optionsDifficulty,
        optionsYears,
        optionsInstitutions,
        orderByOptions,
        data,
    ]);
    const activeFiltersWithLabel = useMemo(() => {
        if (!filters) return [];

        return Object.entries(filters)
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([key, value]) => {
                const options = filtersOptionsMap[key];
                if (!options) return null;

                const found = options.find(opt => opt.value === value);

                return found
                    ? {
                        key,
                        label: found.label,
                        value: found.value,
                    }
                    : null;
            })
            .filter(Boolean);
    }, [filters, filtersOptionsMap]);

    const ActiveFilters = useCallback(() => {
        return (
            <div className={styles.activeFiltersWithBtn}>
                <div className={styles.selectedFilters}>
                    <Text
                        text={'Filtros: '}
                        size={'2'}
                        color={'gray'}
                    />
                    {activeFiltersWithLabel.map((item) => (
                        <Badge
                            key={item.key}
                            text={item.label}
                            variant={'surface'}
                            radius={'full'}
                            size={'2'}
                            color={'gray'}
                        />
                    ))}
                </div>
                <Button
                    text={'Limpar filtros'}
                    variant={'ghost'}
                    color={'red'}
                    radius={'full'}
                    size={'2'}
                    classnames={styles.clearFiltersBtn}
                    onClick={clearAllFilters}
                />
            </div>
        );
    }, [activeFiltersWithLabel, clearAllFilters]);

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
                                variant={!showFilters ? 'surface' : 'solid'}
                                color={!showFilters ? 'gray': 'blue'}
                                radius={'large'}
                                size={'4'}
                                icon={<SlidersHorizontalIcon
                                    width={16}
                                    height={16}
                                    color={!showFilters ? colors['color-gray-common'] : colors['color-white']}
                                />}
                                classnames={!showFilters ? styles.filterBtn : styles.filterActiveBtn}
                                onClick={handleShowFilters(showFilters)}
                            />
                            <Select
                                label={'Ordenar por'}
                                options={orderByOptions}
                                position={'left'}
                                labelIcon={<ClockIcon color={colors['color-black-default']}/>}
                                value={filters?.orderBy}
                                /* eslint-disable-next-line react/jsx-no-bind */
                                onValueChange={(value) => {
                                    if (!value) return null;

                                    changeFilterCommon('orderBy', value);
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
                    {activeFiltersWithLabel.length >= 1 && (
                        <div className={styles.activeFilters}>
                            <ActiveFilters/>
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
