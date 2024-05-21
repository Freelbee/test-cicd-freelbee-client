'use client';

import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw, Title1 } from "@freelbee/shared/ui-kit";

import{ ReactComponent as MeetIcon} from '../assets/Meet.svg';

export const MeetFreelbee = () => (
    <Container>
        <MeetIcon />
        <Title1 $align='center' as='h2'>
            convenient and cost-effective platform
            <br/>for managing contractors
        </Title1>
    </Container>
);

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;
    padding-top: 115px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        padding-top: ${vw(100, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding-top: 0;
    }

    svg {
        width: 376px;

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
        width: 340px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            width: 310px;
        }
    }
`;
