import { setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { Button as ButtonRadix } from '@radix-ui/themes';
import { Loader2Icon } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

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
    children,
    ...props
}) {
    const componentClass = useClassNames(setExtraClass(styles.buttonDefault, [classnames]));

    if (animatedicon && icon) {
        icon = <span className={styles.iconAnimation}>{icon}</span>;
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
            {loading && <Loader2Icon className="size-4 animate-spin" />}
            {!loading && setIconLocation(position, icon, text, gapIcon)}
            {children && children}
        </ButtonRadix>
    );
}

Button.Html = function ButtonHtml({
    children,
    props,
}) {
    return (
        <Button className="htmlButton" {...props}>
            {children}
        </Button>
    );
};

Button.Card = function GlobalizedIcon({
    children,
    icon,
    iconClassName,
    ...props
}) {
    const backgroundCardIcon = useClassNames(setExtraClass(styles.iconCard, [
        iconClassName === 'green' && styles.green,
        iconClassName === 'yellow' && styles.yellow,
        iconClassName === 'blue' && styles.blue,
        iconClassName === 'gold' && styles.gold,
        iconClassName === 'cyan' && styles.cyan,
    ]));

    return (
        <ButtonRadix
            variant={'outline'}
            color={'gray'}
            className={styles.cardButton}
            {...props}
        >
            <div className={styles.cardContainer}>
                <div className={backgroundCardIcon}>
                    {icon}
                </div>
                <div className={styles.cardContent}>
                    {children}
                </div>
            </div>
        </ButtonRadix>
    );
};

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
