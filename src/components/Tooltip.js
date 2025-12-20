import { Tooltip as TooltipComponent, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { CircleHelpIcon, GoalIcon } from 'lucide-react';

import styles from './Tooltip.module.css';

export default function Tooltip({
    children,
    icon = <CircleHelpIcon width={16} height={16}/>,
    sideOffset = 0,
    ...props
}) {
    return (
        <TooltipComponent {...props}>
            <TooltipTrigger asChild>{icon}</TooltipTrigger>
            <TooltipContent children={children} className={styles.tooltipChildren} sideOffset={sideOffset}>
            </TooltipContent >
        </TooltipComponent>
    );
}
;
