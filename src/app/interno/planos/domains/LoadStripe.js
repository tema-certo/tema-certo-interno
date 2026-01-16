import { envs } from '@/envs';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(envs.STRIPE_PUB_KEY);

export default stripePromise;
