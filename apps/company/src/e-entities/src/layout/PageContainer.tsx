'use client';

import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> { 
    children: ReactNode;
};


export const PageContainer = ({children, ...rest}: Props) => {
  return (
    <Container {...rest}>{children}</Container>
  )
}

const Container = styled.div`
    background-color: ${Color.WHITE};
    border-radius: ${BORDER_RADIUS.L};
    padding: 32px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding: 16px;
    }
`;