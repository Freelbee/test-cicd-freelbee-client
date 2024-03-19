import { Suspense } from "react";

import { ActionButton } from "./ui/ActionButton";
import { CardsGrid } from "./ui/CardsGrid";
import { Title } from "./ui/SectionTitle";
import { SectionWrapper } from "./ui/SectionWrapper";
import { BaseSectionBlock } from "@landing/shared";
import { SectionId } from "@landing/entities";

export const BenefitsSection = () => (
    <BaseSectionBlock id={SectionId.BENEFITS}>
        <SectionWrapper>
            <Title />
            <CardsGrid />
            <Suspense fallback={<></>}>
                <ActionButton />            
            </Suspense>
           
        </SectionWrapper>
    </BaseSectionBlock>
);
