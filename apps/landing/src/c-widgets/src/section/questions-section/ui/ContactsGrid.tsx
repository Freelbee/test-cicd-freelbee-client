'use client';

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";

export const ContactsGrid = ({children}: PropsWithChildren) => (
    <Grid>{children}</Grid>
);

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: ${vw(80, Breakpoint.Large)};
    align-items: flex-start;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        grid-template-columns: 1fr 1fr;
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        grid-template-columns: 1fr;
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        gap: 24px;
    }
`;
