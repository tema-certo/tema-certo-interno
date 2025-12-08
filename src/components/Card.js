import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { getEssayProps, setExtraClass } from '@/helpers';
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
    ...props
}) {
    const variantFilter = variant || 'surface';
    const classNameSetter = useClassNames(setExtraClass(styles.card, [className]));

    return (
        <Box minWidth={minW} maxWidth={maxW} className={styles.cardContainer}>
            <RadixCard className={classNameSetter} variant={variantFilter} {...props}>
                {title && (
                    <div className={styles.titleContainer} align={aligntitle}>
                        <Text
                            text={title}
                            isTitle
                            as={'h1'}
                            size={'6'}
                            className={styles.title}
                        />
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

Card.propTypes = {
    title: PropTypes.string,
    html: PropTypes.node,
    actions: PropTypes.node,
    minW: PropTypes.string,
    maxW: PropTypes.string,
    aligntitle: PropTypes.oneOf(['left', 'center', 'right']),
};
