'use client';

import styled from "styled-components";

import { Breakpoint, Color, mediaBreakpointDown, Heading2, Text} from "@freelbee/shared/ui-kit";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: any;
    title: string;
    text: string;
}

export const Card = ({Icon, text, title}: Props) => (
    <Container>
        <Icon />
        <Heading2 as='p'>{title}</Heading2>
        <Text color={Color.GRAY_700} font='body'>{text}</Text>
    </Container>
);

const Container = styled.div`
    border-radius: 24px;
    background-color: ${Color.GRAY_200};
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
    }
`;
