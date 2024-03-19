'use client';

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const SectionWrapper = ({children}: PropsWithChildren) => (
    <Container>
        {children}
    </Container>
);


const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;
    border-radius: 32px;
    background-color: ${Color.WHITE};

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 16px;
    }
`;
