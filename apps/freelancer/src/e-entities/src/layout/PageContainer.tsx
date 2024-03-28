'use client';

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> { 
    children: ReactNode;
};


export const PageContainer = ({children, ...rest}: Props) => {
  return (
    <Container {...rest}>PageContainer</Container>
  )
}

const Container = styled.div`
    padding: 32px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding: 16px;
    }
`;