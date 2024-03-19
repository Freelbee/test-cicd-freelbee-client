
import { Color, Heading2, Title1 } from "@freelbee/shared/ui-kit";

import { StepsGrid } from "./ui/StepsGrid";
import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { SectionId } from "@landing/entities";

export const StepsSection = () => (
    <BaseSectionBlock id={SectionId.STEPS} style={{position: 'relative', overflow: 'hidden'}}>
        <SectionTitle>
            <Title1 as='h2' $align='center'>Get started in&nbsp;just a few minutes</Title1>
            <Heading2 as='p' $align='center' $color={Color.GRAY_600}>
                Has a&nbsp;variety of&nbsp;features that make it&nbsp;the best place to&nbsp;start pay
            </Heading2>
        </SectionTitle>
        <StepsGrid />
    </BaseSectionBlock>
);
