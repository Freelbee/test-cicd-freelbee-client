import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { CARDS_DATA } from "./data/cardsData";
import { Card } from "./ui/Card";
import { Color, Heading2, Title1 } from "@freelbee/shared/ui-kit";
import { TwoColumnsGrid } from "./ui/TwoColumnsGrid";

export const IndustriesSection = () => (
    <BaseSectionBlock>
        <SectionTitle>
            <Title1 as='h2' $align='center'>Companies we&nbsp;
                <Title1 as='span' $gradient={Color.GRADIENT_GREENBLUE}>perfectly match</Title1> with</Title1>
            <Heading2 as='p' $align='center' $color={Color.GRAY_600}>
                Businesses with recurring payments to over 10&nbsp;freelancers and contractors, including
            </Heading2>
        </SectionTitle>
        <TwoColumnsGrid>
            {CARDS_DATA.map((card, idx) => <Card image={card.image} title={card.title} key={idx}/>)}
        </TwoColumnsGrid>
    </BaseSectionBlock>
);
