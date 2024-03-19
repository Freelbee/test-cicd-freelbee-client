'use client';

import { MutableRefObject, useEffect} from "react";
import styled from "styled-components";
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";

import { Breakpoint, Color, mediaBreakpointDown, typography } from "@freelbee/shared/ui-kit";

interface Props {
    countFrom?: number;
    countTo: number;
    container: MutableRefObject<HTMLDivElement | null>;
    animationBoundaries?: string
}

export const Count = ({countFrom = 0, countTo, container, animationBoundaries = '0px 40% -50px 0px'}: Props) => {

    const from = useMotionValue(countFrom);
    const rounded = useTransform(from, Math.round);
    const isInView = useInView(container, {once: true, margin: animationBoundaries});

    useEffect(() => {
        let animation;
        if(isInView) {
            animation = animate(from, countTo, { duration: 3 });
        }

        return animation?.stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isInView]);

    return (
            <Container>
                {rounded}
            </Container>
    );
};

const Container = styled(motion.span)`
  ${typography.demiBold};
  color: ${Color.GRAY_900};
  font-size: 72px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    font-size: 64px;
  }
`;
