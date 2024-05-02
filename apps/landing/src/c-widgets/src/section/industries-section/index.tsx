import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { CARDS_DATA } from "./data/cardsData";
import { Card } from "./ui/Card";
import { Color, Heading2, Title1 } from "@freelbee/shared/ui-kit";
import { TwoColumnsGrid } from "./ui/TwoColumnsGrid";

export const IndustriesSection = () => (
    <BaseSectionBlock>
        <SectionTitle>
            <Title1 as='h2'>Companies we&nbsp;perfectly match with</Title1>
            <Heading2 as='p' $color={Color.GRAY_800}>
                Businesses with recurring payments to over 10&nbsp;freelancers and contractors, including
            </Heading2>
        </SectionTitle>
        <TwoColumnsGrid>
            {CARDS_DATA.map((card, idx) => <Card image={card.image} title={card.title} key={idx}/>)}
        </TwoColumnsGrid>
    </BaseSectionBlock>
);
