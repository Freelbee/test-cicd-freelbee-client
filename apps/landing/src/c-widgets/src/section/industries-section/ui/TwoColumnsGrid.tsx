'use client';

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const TwoColumnsGrid = ({children}: PropsWithChildren) => (
    <Container>{children}</Container>
);

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin: 0 auto;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        grid-template-columns: 1fr;
        gap: 24px;
    }
`;
