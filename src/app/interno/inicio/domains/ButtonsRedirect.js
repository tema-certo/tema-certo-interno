import Button from '@/components/Button';
import Card from '@/components/Card';
import Text from '@/components/Text';
import Icons from '@/icons/icons';
import PencilIcon from '@/icons/pencil/pencil';
import { BookOpenIcon, ChartBarIncreasing } from 'lucide-react';

import styles from './ButtonsRedirect.module.css';

const iconColors = {
    pencil: {
        color: '#0b64f4',
    },
    book: {
        color: '#16a249',
    },
    chart: {
        color: '#894b00',
    },
};

export default function ButtonsRedirect() {
    return (
        <div className={styles.cardButtonContainer}>
            <Button.Card
                icon={<PencilIcon
                    width={24} height={24} color={iconColors.pencil.color}
                />}
                iconClassName={'blue'}
	        >
                <div>Nova redação</div>
            </Button.Card>
            <Button.Card
                icon={<BookOpenIcon width={24} height={24} color={iconColors.book.color}/>}
                iconClassName={'green'}
	        >
                <div>Ver temas</div>
            </Button.Card>
            <Button.Card
                icon={<ChartBarIncreasing width={24} height={24} color={iconColors.chart.color}/>}
                iconClassName={'gold'}
	        >
                <div>Estatísticas</div>
            </Button.Card>
        </div>
    );
}
