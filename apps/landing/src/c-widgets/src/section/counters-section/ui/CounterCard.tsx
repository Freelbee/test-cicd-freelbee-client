'use client';

import { useRef} from "react";
import styled from "styled-components";

import { Breakpoint, Color, mediaBreakpointDown, vw, Text } from "@freelbee/shared/ui-kit";

import { CounterData } from "../interface/Counter";
import { Count } from "@landing/entities";

interface Props {
    data: CounterData;
}

export const CounterCard = ({data}: Props) => {
    const {subtitle, Icon, prefix, countTo, countFrom = 0} = data;
    const counterRef = useRef<HTMLDivElement | null>(null);

    return (
        <Container ref={counterRef}>
            {prefix && <Text font='title1' color={Color.BLUE}>{prefix}</Text>}

            <Count container={counterRef} countTo={countTo} countFrom={countFrom} />

            <Subtitle>
                {<Icon />}
                <Text font='heading2'>{subtitle}</Text>
            </Subtitle>
        </Container>
    );
};

const Container = styled.div`
    text-align: center;
    border-radius: 64px;
    background-color: ${Color.WHITE};
    box-shadow: 0px 8px 16px 0px rgba(47, 60, 51, 0.05);
    padding: 48px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        padding: ${vw(48, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: ${vw(48, Breakpoint.Tablet)};
    }
`;

const Subtitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.3em;
    padding-top: 0.3em;

    svg {
        stroke: ${Color.BLUE};
        width: 1.2em;
        height: 1.2em;
    }
`;
