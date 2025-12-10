import { setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { Text as RadixText } from '@radix-ui/themes';
import { Separator } from '@radix-ui/themes/dist/esm';
import PropTypes from 'prop-types';

import styles from './Text.module.css';

export default function Text({
    text,
    type,
    classNames,
    color,
    isTitle,
    icon,
    iconLocation,
    gapSize,
    middleSeparator,
    bold,
    ...props
}) {
    const titleMode = isTitle ? styles.titleDefault : '';

    const componentClass = useClassNames([setExtraClass(!isTitle ? styles.textDefault : '', [
        classNames,
        color === 'black' && styles.black,
        bold && styles.bolder,
    ]), titleMode]);



    return (
        <RadixText
            size={type}
            className={componentClass}
            color={color}
            {...props}
        >
            {setIconLocation(iconLocation, icon, text, gapSize)}
        </RadixText>
    );
}

Text.Separator = function TextSeparator({ ...props }) {
    return (
        <div className={styles.middleSeparator}>
            <Separator my="3" size="4" />
            <Text
                {...props}
                as="span"
            />
            <Separator my="3" size="4" />
        </div>
    );
};

Text.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8']),
    color: PropTypes.oneOf['blue'],
    isTitle: PropTypes.bool,
    icon: PropTypes.node,
    iconLocation: PropTypes.oneOf(['left', 'right']),
    gapSize: PropTypes.oneOf(['1', '1.5', '2', '2.5', '4', '8', '16']),
};
