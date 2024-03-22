import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { CardsRow } from "./ui/CardsRow";
import { SectionId } from "@landing/entities";
import { Color, Heading2, Title1 } from "@freelbee/shared/ui-kit";

export const CompareSection = () => (
    <BaseSectionBlock id={SectionId.PRICING}>
        <SectionTitle>
            <Title1 as='h2'>Pricing</Title1>
            <Heading2 as='p'$color={Color.GRAY_800}>
                We&nbsp;designed our pricing model to&nbsp;meet the specific needs of&nbsp;marketing agencies, CPA agencies, and online media.
            </Heading2>
        </SectionTitle>
        <CardsRow />
    </BaseSectionBlock>
);
