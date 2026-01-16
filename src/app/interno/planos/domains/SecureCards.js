import { useMemo } from 'react';

import colors from '@/colors';
import Card from '@/components/Card';
import { ClockIcon, StarIcon } from '@radix-ui/react-icons';
import { Shield } from 'lucide-react';

import styles from './SecureCards.module.css';

export default function SecureCards() {

    const cardsData = useMemo(() => {
        return [
            {
                subText: 'Stripe & SSL',
                value: 'Pagamento seguro',
                icon: <Shield width={24} height={24} color={colors['color-title-blue']} />,
                iconClassName: 'blue',
            },
            {
                subText: 'Em até 30 segundos',
                value: 'Correção rápida',
                icon: <ClockIcon width={24} height={24} color={colors['color-title-blue']} />,
                iconClassName: 'blue',
            },
	        {
                subText: '98% aprovam',
		        value: 'Satisfação',
		        icon: <StarIcon width={24} height={24} color={colors['color-title-blue']} />,
		        iconClassName: 'blue',
	        },
        ];
    }, []);

    return (
        <div className={styles.containerCards}>
            {cardsData.map((card, index) => {
                return (
                    <Card.WithIcon
                        key={index}
                        subText={card.subText}
                        value={card.value}
                        icon={card.icon}
                        iconClassName={card.iconClassName}
                        titleSize={'5'}
                        noBorder
                    />
                );
            })}
        </div>
    );
}
