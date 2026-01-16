'use client';

import Benefits from '@/app/interno/checkout/domains/Benefits';
import CheckoutEmbedded from '@/app/interno/planos/domains/CheckoutEmbedded';
import Container from '@/components/Container';
import Text from '@/components/Text';
import useStore from '@/hooks/useStore';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { CheckIcon, ShieldIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

export default function Page() {
    const router = useRouter();
    const subscribeSession = useStore(state => state.userSessionSubscribe);

    if (!subscribeSession || !subscribeSession.clientSecret) {
        return router.push('/interno/planos');
    }

    return (
        <main className={styles.checkoutPage}>
            <Container>
                <div className={styles.containerCheckout}>
                    <div className={styles.checkoutColumn}>
                        <div className={styles.progressBar}>
                            <div className={`${styles.progressStep} ${styles.active}`}>
                                <Text
                                    text={'1'}
                                    size={'2'}
                                    color={'black'}
                                    bold
                                    className={styles.stepNumber}
                                />
                                <Text
                                    text={'Pagamento'}
                                    as={'span'}
                                    size={'1'}
                                    color={'gray'}
                                    className={styles.stepLabel}
                                />
                            </div>
                            <div className={styles.progressLine}></div>
                            <div className={styles.progressStep}>
                                <Text
                                    text={'2'}
                                    size={'2'}
                                    color={'gray'}
                                    bold
                                    className={styles.stepNumber}
                                />
                                <Text
                                    text={'Confirmação'}
                                    as={'span'}
                                    size={'1'}
                                    color={'gray'}
                                    className={styles.stepLabel}
                                />
                            </div>
                        </div>

                        <div className={styles.checkoutTitle}>
                            <h1>Complete sua assinatura</h1>
                            <p>Você está a segundos de começar sua evolução</p>
                        </div>

                        <div className={styles.stripeContainer}>
                            <CheckoutEmbedded options={subscribeSession} />
                        </div>

                        <div className={styles.trustBadgesBottom}>
                            <div className={styles.trustItem}>
                                <LockClosedIcon width={16} height={16} />
                                <Text
                                    text={'Pagamento seguro'}
                                    as={'span'}
                                    size={'1'}
                                    color={'gray'}
                                />
                            </div>
                            <div className={styles.trustItem}>
                                <CheckIcon width={16} height={16} />
                                <Text
                                    text={'Cancele quando quiser'}
                                    as={'span'}
                                    size={'1'}
                                    color={'gray'}
                                />
                            </div>
                            <div className={styles.trustItem}>
                                <ShieldIcon width={16} height={16} />
                                <Text
                                    text={'Acesso imediato'}
                                    as={'span'}
                                    size={'1'}
                                    color={'gray'}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.benefitsColumn}>
                        <Benefits />

                        <div className={styles.testimonial}>
                            <div className={styles.testimonialQuote}>"</div>
                            <Text
                                text={'Melhorei minha nota em 200 pontos em apenas 3 semanas. O feedback da IA é realmente personalizado.'}
                                as={'p'}
                                size={'2'}
                                color={'gray'}
                                bold
                                classNames={styles.testimonialText}
                            />
                            <div className={styles.testimonialAuthor}>
                                <div className={styles.authorAvatar}>👤</div>
                                <div>
                                    <strong>Ana C. Medeiros</strong>
                                    <span>Aprovada no ENEM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    );
}
