import Text from '@/components/Text';
import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { CheckIcon } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './List.module.css';

export default function List({
    title,
    items,
    className,
    useCheckmark,
}) {
    const componentClass = useClassNames([setExtraClass('list-default', [className])]);
    const listDisc = useClassNames([
        styles.listDisc,
        useCheckmark && styles.listCheckmark,
    ]);

    return (
        <div className={`${componentClass} flex flex-col`}>
            {title && <Text
                text={title}
                as="h2"
                className={styles.title}
            />}
            <ul className={listDisc}>
                {items.map((item) => {
                    if (useCheckmark) {
                        return (
                            <li key={item} className={styles.listItem}>
                                <div className={styles.listItemCheck}>
                                    <CheckIcon
                                        width={16}
                                        height={16}
                                        color={'green'}
                                        className={styles.checkIcon}
                                    />
                                    <Text
                                        text={item}
                                        as="p"
                                        size="2"
                                        color="gray"
                                    />
                                </div>
                            </li>
                        );
                    }

                    return (
                        <li key={item} className={styles.listItem}>
                            <Text
                                text={item}
                                as="p"
                                size="2"
                                color="gray"
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

List.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
};
