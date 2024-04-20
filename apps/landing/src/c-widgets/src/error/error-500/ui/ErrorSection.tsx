'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { SectionTitle } from '@landing/shared';
import { Breakpoint, ButtonStyleEnum, Text, Title1, mediaBreakpointDown, mediaBreakpointUp, vw } from '@freelbee/shared/ui-kit';
import { Button } from "@freelbee/shared/ui-kit";

import { ErrorImage } from './ErrorImage';

export const ErrorSection = () => (
    <SectionRow>
        <SectionText>
            <SectionTitle>
                <Title1>Internal Server&nbsp;Error</Title1>
                <Text font='body'>Try reloading the page.<br/>
                    We are working hard to fix Freelbee for&nbsp;you as&nbsp;soon as possible
                </Text>
        
                <MainLink href='/' aria-label='To the main page'>
                    <Button styleType={ButtonStyleEnum.GREEN} wideOnBreakPoint={Breakpoint.xMobile}>Back to Main</Button>
                </MainLink>
            </SectionTitle>            
        </SectionText>

        <ErrorImage />
    </SectionRow>
);

const MainLink = styled(Link)`
    margin-top: 24px;
`;

const SectionText = styled.div`
    width: 284px;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 100%;
    }
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


