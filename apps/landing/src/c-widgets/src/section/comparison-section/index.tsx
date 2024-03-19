
import { BaseSectionBlock, SectionTitle } from '@landing/shared';
import { FreelbeeTable } from './ui/FreelbeeTable';
import { FullTable } from './ui/FullTable';
import { SectionId } from '@landing/entities';
import { Title1 } from '@freelbee/shared/ui-kit';

export const ComparisonTableSection = () => (
    <BaseSectionBlock id={SectionId.TABLE}>
        <SectionTitle>
            <Title1 $align='center' as='h2'>Reasons to&nbsp;choose Freelbee over alternatives</Title1>
        </SectionTitle>
        <FreelbeeTable />
        <FullTable />

    </BaseSectionBlock>
);
