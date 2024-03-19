
import { BaseSectionBlock, SectionTitle } from '@landing/shared';
import { Map } from './ui/Map';
import { SectionGrid } from './ui/SectionGrid';
import { Text, Title1 } from '@freelbee/shared/ui-kit';

export const CountriesSection = () => (
    <BaseSectionBlock style={{overflow: 'hidden'}}>
        <SectionGrid>
            <SectionTitle>
                <Title1 as='h2'>
                    160+ supported countries
                </Title1>
                <Text font='body' as='p'>
                  Hiring contractors from other countries is a great option to cut costs. Yet, it entails additional time managing contractor relationships and occasional compliance risks.
                </Text>
                <Text font='body' as='p'>
                  Freelbee absorbs the contractor management challenges. Endless contracting, invoicing and payment processing are simplified to several clicks.
                </Text>
            </SectionTitle>
            <Map />
        </SectionGrid>
    </BaseSectionBlock>
);
