import stripePromise from '@/app/interno/planos/domains/LoadStripe';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';

import styles from './CheckoutEmbedded.module.css';

export default function CheckoutEmbedded({
    options,
}) {
    return (
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={options}
        >
            <EmbeddedCheckout
                className={styles.containerCheckout}
            />
        </EmbeddedCheckoutProvider>
    );
}
