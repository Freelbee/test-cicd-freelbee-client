'use client';
import { Suspense } from 'react';
import styled from 'styled-components';

import { Text, Title1, Breakpoint, Color, mediaBreakpointDown } from '@freelbee/shared/ui-kit';

import { ActionButton } from './ActionButton';
import { SectionTitle } from '@landing/shared';

export const TextContent = () => (
    <Content>
        <SectionTitle>
            <Title1 as='h2'>Anywhere <Title1 as='span' $gradient={Color.GRADIENT_GREENBLUE}>Anytime</Title1></Title1>
            <Text font="body">Work with the platform from any device thanks to convenient interface</Text>
        </SectionTitle>
        <Suspense fallback={<></>}>
            <ActionButton />
        </Suspense>

    </Content>
);

const Content = styled.div`
    margin-top: 82px;
    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        max-width: 100%;
        margin-top: 0;
    }
`;
