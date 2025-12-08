import { useCallback, useState } from 'react';

import Input from '@/components/Input';
import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { toast } from 'sonner';

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


export function setIconLocation(position, icon, text, gap) {
    if (!icon) return text;

    const gapClasses = {
        '1': 'gap-1',
        '1.5': 'gap-1.5',
        '2': 'gap-2',
        '2.5': 'gap-2.5',
        '4': 'gap-4',
        '8': 'gap-8',
        '16': 'gap-16',
    };


    return (
        <div className={`flex items-center ${gapClasses[gap] || 'gap-2'}`}>
            {(position === 'left' || !position) && icon}
            {text}
            {position === 'right' && icon}
        </div>
    );
}

export function setExtraClass(defaultClass, extraClass) {
    return extraClass && extraClass.length ? [defaultClass, ...extraClass] : defaultClass;
}

export function getEssayProps(category, difficulty, definedTime) {
    const difficultyData = badgeDifficultyColorDefiner.find(item => {
        return item.identifier === difficulty;
    });

    const categoryData = badgeCategoryColorDefiner.find(item => {
        return item.identifier === category;
    });

    return {
        difficultyData,
        categoryData,
        definedTime,
    };
}

export function InputPassword({
    control,
    size,
    radius,
    placeholder,
    color,
    label,
    name,
    id,
    ...props
}) {
    const [pwdIco, setPwdIco] = useState(true);

    const handleExtraIconClick = useCallback(() => {
        setPwdIco(!pwdIco);
    }, [pwdIco]);

    const validateTypeIco = useCallback(() => {
        return pwdIco ? 'password' : 'text';
    }, [pwdIco]);

    const extraIcon = useCallback(() => {
        return pwdIco ? <EyeClosedIcon/> : <EyeOpenIcon/>;
    }, [pwdIco]);

    return (
        <Input.Field
            control={control}
            placeholder={placeholder}
            size={size}
            radius={radius}
            required
            color={color}
            label={label}
            name={name}
            id={id}
            icon={<LockClosedIcon/>}
            type={validateTypeIco()}
            onClickExtra={handleExtraIconClick}
            extraIcon={extraIcon()}
            {...props}
        />
    );
}

export function dismissLoadingToast({
    toastId,
    type,
    message,
}) {
    toast.dismiss(toastId);

    if (type === 'success') {
        toast.success(message);
    } else {
        toast.error(message);
    }

}

export const AvgRanking = [
    {
        value: 0,
        label: 'Bronze',
        color: 'bronze',
    },
    {
        value: 250,
        label: 'Prata',
        color: 'gray',
    },
    {
        value: 400,
        label: 'Ouro',
        color: 'gold',
    },
    {
        value: 650,
        label: 'Platina',
        color: 'blue',
    },
    {
        value: 800,
        label: 'Diamante',
        color: 'purple',
    },
    {
        betterThan: true,
        value: 920,
        label: 'Mestre',
        color: 'red',
    },
];
