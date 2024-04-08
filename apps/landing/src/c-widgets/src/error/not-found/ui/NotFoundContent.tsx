'use client';

import Link from 'next/link';
import styled from 'styled-components';

import { NotFoundImage } from './NotFoundImage';
import { SectionTitle } from '@landing/shared';
import { Breakpoint, ButtonStyleEnum, Text, Title1, mediaBreakpointDown, mediaBreakpointUp, vw } from '@freelbee/shared/ui-kit';
import { Button } from "@freelbee/shared/ui-kit";

export const NotFoundContent = () => (
    <SectionRow>
        <SectionTitle>
            <Title1>Oops!</Title1>
            <Text font='body'>This page not found, refresh it <br/>or come back later</Text>
            <MainLink href='/' aria-label='To the main page'>
                <Button styleType={ButtonStyleEnum.GREEN} wideOnBreakPoint={Breakpoint.xMobile}>Back to Main</Button>
            </MainLink>
        </SectionTitle>
        <NotFoundImage />
    </SectionRow>
);

const MainLink = styled(Link)`
    margin-top: 24px;
`;

const SectionRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${vw(174, Breakpoint.Large)};

    ${mediaBreakpointUp(Breakpoint.FHD)} {
        gap: 174px;
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        gap: ${vw(130, Breakpoint.xMedium)};
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        gap: ${vw(66, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        flex-direction: column-reverse;
        align-items: stretch;
    }
`;


