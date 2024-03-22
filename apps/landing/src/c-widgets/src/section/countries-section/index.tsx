
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
                Hiring international contractors with Freelbee simplifies management, reduces costs and compliance risks by streamlining contracting invoicing and payments just in a few clicks.
                </Text>
            </SectionTitle>
            <Map />
        </SectionGrid>
    </BaseSectionBlock>
);
