'use client';

import Image from "next/image";
import styled from "styled-components";

import { Breakpoint, Color, mediaBreakpointDown, vw, Heading1, Text } from "@freelbee/shared/ui-kit";

import { Step } from "../interface/Step";

interface Props {
    data: Step;
}

export const StepCard = ({data}: Props) => (
    <Container>
        <ImageContainer>
            <Image

              src={data.image} alt={data.title} fill />
        </ImageContainer>
        <Heading1 $align='center' as='p'>{data.title}</Heading1>
        <Text align='center' font='body' color={Color.GRAY_600}>{data.description}</Text>
    </Container>
);

const Container = styled.div`
    background-color: ${Color.WHITE};
    border-radius: 20px;
    text-align: center;
    padding: 21px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid ${Color.GRAY_300};
`;

const ImageContainer = styled.div`
    position: relative;
    width: ${vw(200, Breakpoint.Large)};
    height: ${vw(200, Breakpoint.Large)};
    max-width: 250px;
    max-height: 250px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        width: ${vw(200, Breakpoint.Tablet)};
        height: ${vw(200, Breakpoint.Tablet)};
        min-width: 150px;
        min-height: 150px;
    }
`;
