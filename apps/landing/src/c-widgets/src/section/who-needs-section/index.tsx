
import { SectionId } from "@landing/entities";
import { CardsBlock } from "./ui/CardsBlock";
import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { Title1 } from "@freelbee/shared/ui-kit";

export const WhoNeedsSection = () => (
    <BaseSectionBlock id={SectionId.WHO_NEED}>
        <SectionTitle>
            <Title1 as='h2' $align='center'>Who needs us</Title1>
        </SectionTitle>
        <CardsBlock />
    </BaseSectionBlock>
);
