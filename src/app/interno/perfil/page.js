import InitialHeader from '@/app/interno/perfil/domains/InitialHeader';
import StateSelector from '@/app/interno/perfil/domains/StateSelector';
import Container from '@/components/Container';

import styles from './page.module.css';

export default function Page() {
    return (
        <main className={styles.mainContainer}>
            <Container
                className={styles.containerPage}
            >
                <InitialHeader/>
                <StateSelector/>
            </Container>
        </main>
    );
}
