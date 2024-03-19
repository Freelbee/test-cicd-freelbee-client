'use client';

import styled from 'styled-components';

import { SectionTitle } from '@landing/shared';

import { Color, Title2 } from '@freelbee/shared/ui-kit';
import { QuestionForm } from '@landing/features';

export const FormBlock = () => (
    <Container>
        <SectionTitle>
            <Title2 as='h2'>Still have questions?</Title2>
        </SectionTitle>
        <QuestionForm />
    </Container>
);

const Container = styled.div`
    padding: 32px;
    border-radius: 32px;
    background-color: ${Color.WHITE};
`;
