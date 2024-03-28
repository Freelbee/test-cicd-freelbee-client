'use client';

import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { HTMLAttributes, ReactNode } from "react";
import styled, { RuleSet } from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> { 
    children: ReactNode;
    styles: RuleSet<object>
};

export const TableHead = ({children, ...rest}: Props) => {
  return (
    <Container {...rest}>{children}</Container>
  )
}

const Container = styled.div`
    padding: 10px 16px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: ${Color.GRAY_200};

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: none;
    }
`;