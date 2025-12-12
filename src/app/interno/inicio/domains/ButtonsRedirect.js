import { useCallback } from 'react';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Text from '@/components/Text';
import Icons from '@/icons/icons';
import PencilIcon from '@/icons/pencil/pencil';
import { BookOpenIcon, ChartBarIncreasing } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './ButtonsRedirect.module.css';

const iconColors = {
    pencil: {
        color: '#0b64f4',
    },
    book: {
        color: '#16a249',
    },
    chart: {
        color: '#0B8DBFF',
    },
};

export default function ButtonsRedirect() {
    const router = useRouter();

    const handleClick = useCallback((path) => {
        return () => router.push(path);
    }, [router]);

    return (
        <div className={styles.cardButtonContainer}>
            <Button.Card
                icon={<PencilIcon
                    width={24}
                    height={24}
                    color={iconColors.pencil.color}
                />}
                iconClassName={'blue'}
                onClick={handleClick('/interno/temas')}
	        >
                <div>Nova redação</div>
            </Button.Card>
            <Button.Card
                icon={<BookOpenIcon
                    width={24}
                    height={24}
                    color={iconColors.book.color}
                />}
                iconClassName={'green'}
                onClick={handleClick('/interno/temas')}
	        >
                <div>Ver temas</div>
            </Button.Card>
            <Button.Card
                icon={<ChartBarIncreasing
                    width={24}
                    height={24}
                    color={iconColors.pencil.color}
                />}
                iconClassName={'cyan'}
                onClick={handleClick('/interno/estatisticas')}
	        >
                <div>Estatísticas</div>
            </Button.Card>
        </div>
    );
}
