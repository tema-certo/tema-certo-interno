import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';

import styles from './Container.module.css';

export default function Container({
    className,
    children,
}) {
    const extraClasses = useClassNames(setExtraClass(styles.containerPageComponent, [className]));

    return (
        <div className={extraClasses}>
            {children}
        </div>
    );
}
