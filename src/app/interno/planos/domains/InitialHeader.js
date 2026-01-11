import Badge from '@/components/Badge';
import Text from '@/components/Text';
import { StarsIcon } from 'lucide-react';

import styles from './InitialHeader.module.css';

export default function InitialHeader() {
    return (
        <div className={styles.containerHeader}>
            <div>
                <Badge
                    text={'🎓 Oferta de Lançamento - Aproveite!  '}
                    icon={<StarsIcon width={14} height={14} />}
                    variant={'surface'}
                    radius={'full'}
                    size={'3'}
                    color={'blue'}
                />
            </div>
            <div className={styles.containerTitle}>
                <Text
                    text={'Invista no seu '}
                    size={'9'}
                    isTitle
		        />
                <Text
                    text={'futuro'}
                    size={'9'}
                    color={'blue'}
                    isTitle
		        />
            </div>
            <div className={styles.containerSubtitle}>
                <Text
                    text={'🎓 Quem usa, conquista resultados reais com a nossa plataforma.'}
                    size={'4'}
                    color={'gray'}
                    as={'p'}
		        />
                <Text
                    text={'Evolução média: +180 pontos em 8 semanas'}
                    size={'4'}
                    color={'gray'}
                    as={'p'}
		        />
            </div>
        </div>
    );
}
