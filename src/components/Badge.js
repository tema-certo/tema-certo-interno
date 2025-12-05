import { setIconLocation, setExtraClass } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import './Badge.css';
import { Badge as RadixBadge } from '@radix-ui/themes';
import PropTypes from 'prop-types';

export default function Badge({
    text,
    classnames,
    color,
    position,
    icon,
    variant,
    size,
    gapicon,
    ishtml,
    children,
    ...props
}) {
    const componentClass = useClassNames(setExtraClass('badge-default', [classnames]));

    return (
        <RadixBadge
            className={componentClass}
            variant={variant}
            color={color}
            size={size}
            {...props}
        >
            {!ishtml && setIconLocation(position, icon, text, gapicon)}
            {ishtml && children}
        </RadixBadge>
    );
}

Badge.propTypes = {
    text: PropTypes.string || PropTypes.node,
    type: PropTypes.string,
    classnames: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.oneOf(['right', 'left']),
    icon: PropTypes.node,
    variant: PropTypes.oneOf(['solid', 'soft', 'surface', 'outline']),
    size: PropTypes.oneOf(['1', '2', '3']),
    gapicon: PropTypes.number,
};
