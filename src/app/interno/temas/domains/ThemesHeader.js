import colors from '@/colors';
import Text from '@/components/Text';

import styles from './ThemesHeader.module.css';

export default function ThemesHeader() {
    return (
        <div className={styles.containerHeader}>
            <Text
                as={'h1'}
                size={'9'}
                bold
                isTitle
            >
                Escolha seu <Text
                    as={'span'}
                    isTitle
                    classNames={styles.titleColorChange}
	            >Tema</Text>
            </Text>
            <Text
                as={'p'}
                size={'4'}
                color={'gray'}
	        >
                Selecione um tema da nossa biblioteca para começar sua redação.
            </Text>
        </div>
    );
}
