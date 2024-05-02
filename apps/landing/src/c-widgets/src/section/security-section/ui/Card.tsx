'use client';

import styled from "styled-components";

import { Heading2, Text, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import Image from "next/image";

interface Props {
    icon: string;
    title: string;
    text: string;
}

export const Card = ({icon, text, title}: Props) => (
    <Container>
        <Image src={icon} alt='icon' width={80} height={80}/>
        <Heading2 as='p'>{title}</Heading2>
        <Text color={Color.GRAY_700} font='body'>{text}</Text>
    </Container>
);

const Container = styled.div`
    border-radius: 24px;
    background-color: ${Color.WHITE};
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    min-width: 280px;
    max-width: 350px;
    height: 100%;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        max-width: 280px;
    }
`;
