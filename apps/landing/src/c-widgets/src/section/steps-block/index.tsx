
import { Title1 } from "@freelbee/shared/ui-kit";

import { StepsGrid } from "./ui/StepsGrid";
import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { SectionId } from "@landing/entities";

export const StepsSection = () => (
    <BaseSectionBlock id={SectionId.STEPS} style={{position: 'relative', overflow: 'hidden'}}>
        <SectionTitle>
            <Title1 as='h2' $align='center'>Get started in&nbsp;just a few minutes</Title1>
        </SectionTitle>
        <StepsGrid />
    </BaseSectionBlock>
);
