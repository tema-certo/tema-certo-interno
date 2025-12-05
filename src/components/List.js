import Text from '@/components/Text';
import { setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import PropTypes from 'prop-types';

import styles from './List.module.css';

export default function List({
    title,
    items,
    className,
}) {
    const componentClass = useClassNames([setExtraClass('list-default', [className])]);

    return (
        <div className={`${componentClass} flex flex-col`}>
            {title && <Text
                text={title}
                as="h2"
                className={styles.title}
            />}
            <ul className={styles.listDisc}>
                {items.map((item) => (
                    <Text
                        color="gray"
                        size="2"
                        as="li"
                        text={item}
                        key={item}
                        className={styles.listItem}
                    />
                ))}
            </ul>
        </div>
    );
}

List.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.string),
};
