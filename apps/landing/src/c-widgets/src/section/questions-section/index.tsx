'use client';

import { css } from "styled-components";

import { FAQ } from "./data/faqText";
import { ContactsGrid } from "./ui/ContactsGrid";
import { FormBlock } from "./ui/FormBlock";
import { SectionId } from "@landing/entities";
import { BaseSectionBlock, SectionTitle, Tab } from "@landing/shared";
import { Text, Title1 } from "@freelbee/shared/ui-kit";

export const FAQSection = () => (
    <BaseSectionBlock id={SectionId.FAQ}>
        <SectionTitle>
            <Title1 as='h2' $align='center'>FAQ</Title1>
        </SectionTitle>
        <ContactsGrid>
            <div itemScope itemType="https://schema.org/FAQPage">
                {FAQ.map(q => (
                    <Tab key={q.title} title={q.title}>
                        <Text itemProp="text" as='p' font='body' styles={css`max-width: 90%;`}><br/>{q.text}</Text>
                    </Tab>
                ))}
            </div>
            <FormBlock />
        </ContactsGrid>
    </BaseSectionBlock>
);
