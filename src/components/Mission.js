import { useMemo } from 'react';

import colors from '@/colors';
import Text from '@/components/Text';
import { FileTextIcon } from '@radix-ui/react-icons';
import { Progress } from '@radix-ui/themes';
import { BookOpenIcon, CheckCircleIcon } from 'lucide-react';

import styles from './Mission.module.css';

export default function Mission({
    title,
    target,
    countTarget,
    countCurrent,
    ...props
}) {

    let targetFinal = {};

    const possibleTargets = useMemo(() => {
        return [
            {
                'essays': {
                    icon: <FileTextIcon width={16} height={16} />,
                    text: 'Redações',
                },
            },
        ];
    }, []);

    if (target) {
        targetFinal = possibleTargets.find(item => {
            return item[target]?.text;
        })[target];
    }

    const isCompleted = countCurrent === countTarget;

    return (
        <div>
            <div className={styles.missionTitleAndBar}>
                <Text
                    text={title}
                    as={'p'}
                    size={'3'}
                    color={isCompleted ? 'green' : 'gray'}
                    icon={isCompleted ? <CheckCircleIcon
                        width={16}
                        height={16}
                        color={colors['color-green-success']}
                    /> : targetFinal?.icon}
                />
                <Progress
                    title={title}
                    size="3"
                    color={isCompleted ? 'green' : 'blue'}
                    value={countCurrent}
                    radius={'large'}
                    max={countTarget}
                />
            </div>
            <Text
                text={`${countCurrent}/${countTarget} ${targetFinal?.text || ''}`}
                as={'p'}
                bold
                size={'2'}
            />
        </div>
    );
}
