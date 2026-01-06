import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon } from '@radix-ui/react-icons';
import Needle from '@waxs/needle';
import { toast } from 'sonner';

const badgeDifficultyColorDefiner = [
    {
        identifier: 'Easy',
        textConversion: 'Fácil',
        color: 'green',
    },
    {
        identifier: 'Medium',
        textConversion: 'Médio',
        color: 'yellow',
    },
    {
        identifier: 'Hard',
        textConversion: 'Difícil',
        color: 'red',
    },
];

export const badgeCategoryColorDefiner = [
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

export function getEssayProps(category, difficulty) {
    const difficultyData = badgeDifficultyColorDefiner.find(item => {
        return item.identifier === difficulty;
    });

    const categoryData = badgeCategoryColorDefiner.find(item => {
        return item.identifier === category;
    });

    return {
        difficultyData,
        categoryData,
    };
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
        toast[type](message);
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

export async function setTokenCookieSec(token) {
    document.cookie = `token=${token}; path=/; max-age=21600; secure; SameSite=Strict;`;
}

export const formatThemeTitle = (themeTitle) => {
    return themeTitle
        .trim()
        .split(' ')
        .join('-')
        .toLowerCase();
};

export function SplitLargeText(text, limitSize) {
    return text.length > limitSize ? `${text.slice(0, limitSize)}...` : text;
}

export function BadgeColorStyle (score) {
    const itemScore = score;

    if (itemScore <= 250) {
        return 'red';
    }

    if (itemScore <= 550) {
        return 'yellow';
    }

    if (itemScore <= 650) {
        return 'purple';
    }

    if (itemScore <= 800) {
        return 'blue';
    }

    return 'green';
};

export function startFilterArray(data) {
    return new Needle(data);
}
