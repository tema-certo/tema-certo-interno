import './Button.css';
import { setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { Button as ButtonRadix } from '@radix-ui/themes';
import PropTypes from 'prop-types';

export default function Button({
    text,
    variant,
    size,
    color,
    onClick,
    loading,
    icon,
    position,
    classnames,
    gapIcon,
    animatedicon,
    ...props
}) {
    const componentClass = useClassNames(setExtraClass('button-default', [classnames]));

    if (animatedicon && icon) {
        icon = <span className="iconAnimation">{icon}</span>;
    }

    return (
        <ButtonRadix
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={loading}
            color={color}
            className={componentClass}
            {...props}
        >
            {setIconLocation(position, icon, text, gapIcon)}
        </ButtonRadix>
    );
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    variant: PropTypes.oneOf['classic', 'solid', 'soft', 'surface', 'outline', 'ghost'],
    size: PropTypes.oneOf['1', '2', '3', '4'],
    color: PropTypes.oneOf['blue'],
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    icon: PropTypes.node,
    position: PropTypes.oneOf['left', 'right'],
    classnames: PropTypes.arrayOf(PropTypes.string),
    gapicon: PropTypes.number,
};
