import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';

import styles from './ToggleGroup.module.css';

export default function ToggleGroup({
    children,
    ...props
}) {
    const extraClass = useClassNames(setExtraClass(styles.toggleRoot, [props.className]));

    return (
        <RadixToggleGroup.Root {...props} className={extraClass}>
            {children}
        </RadixToggleGroup.Root>
    );
}

ToggleGroup.Item = function ToggleGroupItem({
    children,
    position,
    ...props
}) {
    const extraClass = useClassNames(setExtraClass(styles.toggleItem, [
        props.className,
    ]));

    return (
        <RadixToggleGroup.Item
            {...props}
            className={extraClass}
            position={position}
        >
            {children}
        </RadixToggleGroup.Item>
    );
};
