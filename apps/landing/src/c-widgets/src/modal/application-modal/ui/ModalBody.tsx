'use client';

import { Suspense } from 'react';
import styled from 'styled-components';

import { Breakpoint, Color, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';

import { CloseModalButton } from './CloseModalButton';


export const ModalBody = ({children, ...rest}: React.HTMLAttributes<HTMLDivElement>) => (
    <Container {...rest}>
        <Suspense fallback={<></>}>
            <CloseModalButton />
        </Suspense>
        {children}
    </Container>
);

const Container = styled.div`
    position: relative;
    border-radius: 20px;
    background-color: ${Color.WHITE};
    padding: 32px;
    width: ${vw(700, Breakpoint.Large)};
    min-width: 450px;
    max-width: 800px;
    margin: auto;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 100%;
        min-width: unset;
        max-width: unset;
        padding: 24px;
        padding-top: 36px;
    }
`;
