import CardPlan from '@/app/interno/planos/domains/CardPlan';
import InitialHeader from '@/app/interno/planos/domains/InitialHeader';
import ReferenceCards from '@/app/interno/planos/domains/ReferenceCards';
import SecureCards from '@/app/interno/planos/domains/SecureCards';
import Container from '@/components/Container';

export default function Page() {

    return (
        <main>
            <Container>
                <InitialHeader />
                <CardPlan />
                <SecureCards />
                <ReferenceCards />
            </Container>
        </main>
    );
}
