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
                {items.map((item, index) => {
                    if (useCheckmark) {
                        return (
                            <li key={index} className={styles.listItem}>
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
                        <Text
                            color="gray"
                            size="2"
                            as="li"
                            text={item}
                            key={item}
                            className={styles.listItem}
                        />
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
