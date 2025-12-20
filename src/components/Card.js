import { useCallback } from 'react';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { getEssayProps, setExtraClass, setIconLocation } from '@/helpers';
import useClassNames from '@/hooks/useClassnames';
import { ChevronRightIcon, ClockIcon, FileTextIcon } from '@radix-ui/react-icons';
import { Box, Flex, Inset, Separator, Card as RadixCard } from '@radix-ui/themes';
import PropTypes from 'prop-types';

import styles from './Card.module.css';

export default function Card({
    title,
    html,
    minW,
    maxW,
    aligntitle,
    basecontent,
    variant,
    className,
    iconClassName,
    cardBoxClassName,
    titleSize,
    ownVariant,
    icon,
    iconLocation,
    noBorder,
    ...props
}) {
    const variantFilter = variant || 'surface';

    const classNameSetter = useClassNames(setExtraClass(styles.card, [
        className,
        ownVariant === 'tip' && styles.cardTip,
        ownVariant === 'ranking' && styles.cardRanking,
        !noBorder && styles.border,
    ]));
    const ownVariance = useClassNames(setExtraClass(styles.cardContainer, [
        ownVariant === 'tip' && styles.cardTipBox,
        ownVariant === 'ranking' && styles.cardTipBox,
    ]));

    return (
        <Box minWidth={minW} maxWidth={maxW} className={ownVariance}>
            <RadixCard className={classNameSetter} variant={variantFilter} {...props}>
                {title && (
                    <div className={styles.titleContainer} align={aligntitle}>
                        {setIconLocation(
                            iconLocation,
                            icon,
                            <Text
                                text={title}
                                isTitle
                                as={'h1'}
                                size={titleSize || '6'}
                                className={styles.title}
                            />,
                            '2',
                        )}
                    </div>
                )}
                <div className="content">
                    {html}
                </div>
                {basecontent}
            </RadixCard>
        </Box>
    );
}

Card.WithIcon = function CardWithIcon({
    title,
    minW,
    maxW,
    html,
    aligntitle,
    basecontent,
    variant,
    className,
    iconClassName,
    subText,
    value,
    icon,
    ...props
}) {

    const backgroundCardIcon = useClassNames(setExtraClass(styles.iconCard, [
        iconClassName === 'green' && styles.green,
        iconClassName === 'yellow' && styles.yellow,
        iconClassName === 'blue' && styles.blue,
        iconClassName === 'gold' && styles.gold,
        iconClassName === 'purple' && styles.purple,
        iconClassName === 'red' && styles.red,
        iconClassName === 'pink' && styles.pink,
    ]));

    const iconHtmls = useCallback(({
        icon,
    }) => {
        return (
            <div className={styles.iconContainer}>
                <div>
                    <div className={backgroundCardIcon}>
                        {icon}
                    </div>
                </div>
                <div className={styles.containerInfo}>
                    { subText && (
                        <Text
                            text={subText}
                            size={'1'}
                            as={'span'}
                            color={'gray'}
                        />
                    )}
                    { value && (
                        <Text
                            text={value.toString()}
                            size={'7'}
                            color={'gray'}
                            as={'h1'}
                            className={styles.valueStyle}
                        />
                    )}
                </div>
            </div>
        );
    }, [backgroundCardIcon, subText, value]);

    return (
        <Card
            title={title}
            html={iconHtmls({ icon })}
            minW={minW}
            maxW={maxW}
            aligntitle={aligntitle}
            basecontent={basecontent}
            variant={variant}
            {...props}
        />
    );
};

Card.propTypes = {
    title: PropTypes.string,
    html: PropTypes.node,
    actions: PropTypes.node,
    minW: PropTypes.string,
    maxW: PropTypes.string,
    aligntitle: PropTypes.oneOf(['left', 'center', 'right']),
};
