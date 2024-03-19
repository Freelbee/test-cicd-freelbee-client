'use client';

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const SectionTitle = ({children}: PropsWithChildren) => (
    <TitleGroup>{children}</TitleGroup>
);

const TitleGroup = styled.div`
    display: grid;
    row-gap: 8px;
    margin-bottom: 32px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        margin-bottom: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        margin-bottom: 16px;
    }
`;
