import { setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { Text as RadixText } from '@radix-ui/themes';
import PropTypes from 'prop-types';
import './Text.css';

export default function Text({
    text,
    type,
    classNames,
    color,
    isTitle,
    icon,
    iconLocation,
    gapSize,
    ...props
}) {
    const titleMode = isTitle ? 'title-default' : '';
    const componentClass = useClassNames([setExtraClass('text-default', [classNames]), titleMode]);

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

Text.propTypes = {
    text: PropTypes.string,
    type: PropTypes.oneOf(['1', '2', '3', '4', '5', '6', '7', '8']),
    color: PropTypes.oneOf['blue'],
    isTitle: PropTypes.bool,
    icon: PropTypes.string,
    iconLocation: PropTypes.oneOf(['left', 'right']),
};
