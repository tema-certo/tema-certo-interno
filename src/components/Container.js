import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';

import styles from './Container.module.css';

export default function Container({
    className,
    children,
    delimited,
}) {
    const extraClasses = useClassNames(setExtraClass(styles.containerPageComponent, [className,
        delimited && styles.delimited,
    ]));

    return (
        <div className={extraClasses}>
            {children}
        </div>
    );
}
