import { Title1 } from "@freelbee/shared/ui-kit";

import { AutoSlider, SectionId } from "@landing/entities";
import { BaseSectionBlock, SectionTitle } from "@landing/shared";
import { CARDS_DATA } from "./data/cardsData";
import { Card } from "./ui/Card";

export const SecuritySection = () => (
    <BaseSectionBlock id={SectionId.SECURITY} style={{position: 'relative', overflow: 'hidden'}}>
        <SectionTitle>
            <Title1 as='h2' $align='center'>Security and compliance</Title1>
        </SectionTitle>
        <AutoSlider>
            {CARDS_DATA.map((card, idx) => (
                <Card {...card} key={idx} />
            ))}
        </AutoSlider>
    </BaseSectionBlock>
);
