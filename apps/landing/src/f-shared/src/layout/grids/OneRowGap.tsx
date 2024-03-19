'use client';

import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const GroupWithGap = styled.div`
    display: grid;
    padding: 32px 0;
    row-gap: 32px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        row-gap: 16px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        row-gap: 8px;
        
    }
`;
