'use client';

import { PropsWithChildren } from "react";
import styled from "styled-components";

import { mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const BannerRow = ({children}: PropsWithChildren) => (
    <Container>{children}</Container>
);

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    ${mediaBreakpointDown(800)} {
        flex-direction: column;
    }
`;
