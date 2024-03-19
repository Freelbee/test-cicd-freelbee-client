'use client';

import { useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { useInView } from "framer-motion";

import { ReactComponent as LeftHand }from '@landing/assets/images/main/hands/hand-left.svg';
import { ReactComponent as RightHand} from '@landing/assets/images/main/hands/hand-right.svg';

import { Breakpoint, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";

export const Hands = () => {

    const ref = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, {once: true, margin: "0px 50px -50px 0px"});

    return (
        <Container ref={ref}>
            <LeftContainer $isInView={isInView}>
                <LeftHand />
            </LeftContainer>
            <RightContainer $isInView={isInView}>
                <RightHand />
            </RightContainer>
        </Container>
    );
};

const draw = keyframes`
  from{
    stroke-dashoffset: -2800px;
  }to{
     stroke-dashoffset: 0px;
   }
`;

const Container = styled.div`
    position: absolute;
    width: 100%;
    margin: 0 auto;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        display: none;
    }
`;

const Wrapper = styled.div<{$isInView?: boolean}>`
    position: absolute;

    svg {
        width: 100%;
        stroke-dasharray: 2800px;
        stroke-dashoffset: -2800px;
        ${({$isInView}) => $isInView && css`
            animation: ${draw} 4s ease forwards;
        `}

    }
`;

const LeftContainer = styled(Wrapper)`
    left: -8%;
    top: 70px;
    width: ${vw(420, Breakpoint.Large)};
    max-width: 420px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        top: ${vw(55, Breakpoint.Large)};
    }
`;

const RightContainer = styled(Wrapper)`
    right: ${vw(50, Breakpoint.Large)};
    top: -75px;
    width: ${vw(500, Breakpoint.Large)};
    max-width: 500px;
    user-select: none;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        top: -${vw(70, Breakpoint.Large)};
        right: 0;
    }
`;
