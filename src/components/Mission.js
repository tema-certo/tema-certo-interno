import { useMemo } from 'react';

import colors from '@/colors';
import Text from '@/components/Text';
import Tooltip from '@/components/Tooltip';
import { FileTextIcon, RocketIcon } from '@radix-ui/react-icons';
import { Progress } from '@radix-ui/themes';
import { BookOpenIcon, ChartNetworkIcon, ChartSplineIcon, CheckCircleIcon, GoalIcon } from 'lucide-react';

import styles from './Mission.module.css';

export default function Mission({
    title,
    objective,
    target,
    countTarget,
    countCurrent,
    times,
    strategy,
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
            {
                'login': {
                    icon: <FileTextIcon width={16} height={16}/>,
                    text: 'Acesso',
                },
            },
            {
                'essay_pontuation': {
                    icon: <ChartSplineIcon width={16} height={16} />,
                    text: 'Pontuação',
                },
            },
        ];
    }, []);

    if (target) {
        const found = possibleTargets.find(item => {
            return item[target];
        });

        if (found) {
            targetFinal = found[target];
        } else {
            targetFinal = null;
        }
    }

    let isCompleted = false;
    let valueDone = countCurrent;
    let textValuePossibility = 0;

    if (strategy === 'sum' && (countCurrent >= countTarget)) {
        isCompleted = true;
    }

    if (strategy === 'comparable' && (countCurrent >= countTarget)) {
        valueDone = countTarget;
        isCompleted = true;
        textValuePossibility = times;
    }

    return (
        <div>
            <div className={styles.missionTitleAndBar}>
                <div className={styles.missionTitle}>
                    <Text
                        text={title}
                        size={'3'}
                        color={isCompleted ? 'green' : 'gray'}
                        icon={isCompleted ? <CheckCircleIcon
                            width={16}
                            height={16}
                            color={colors['color-green-success']}
                        /> : targetFinal?.icon}
                    />
                    { objective && (
                        <Tooltip icon={<GoalIcon
                            width={16}
                            height={16}
                            color={colors['color-gray-common']}
                        />}>
                            <p>{objective}</p>
                        </Tooltip>
                    ) }
                </div>
                <Progress
                    title={title}
                    size="3"
                    color={isCompleted ? 'green' : 'blue'}
                    value={valueDone}
                    radius={'large'}
                    max={countTarget}
                />
            </div>
            <Text
                text={`${textValuePossibility || valueDone}/${times || countTarget} ${targetFinal?.text || ''}`}
                as={'p'}
                bold
                size={'2'}
            />
        </div>
    );
}
