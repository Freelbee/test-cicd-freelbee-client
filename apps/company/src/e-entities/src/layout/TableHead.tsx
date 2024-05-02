'use client';

import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { HTMLAttributes, ReactNode } from "react";
import styled, { RuleSet } from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> { 
    children: ReactNode;
    styles: RuleSet<object>
};

export const TableHead = ({children, styles, ...rest}: Props) => {
  return (
    <Container {...rest} $styles={styles}>{children}</Container>
  )
}

const Container = styled.div<{$styles?: RuleSet<object>}>`
    padding: 20px 26px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-color: ${Color.GRAY_200};

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: none;
    }

    ${({$styles}) => $styles};
`;