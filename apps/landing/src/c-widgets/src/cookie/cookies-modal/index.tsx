'use client';

import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { ButtonStyleEnum, Heading1, Text, Breakpoint, Color, mediaBreakpointDown, vw,Z_INDEX } from '@freelbee/shared/ui-kit';
import {Button, CloseButton} from '@freelbee/features/common';
import { CookieHelper } from '@freelbee/shared/helpers';

export const CookiesModal = () => {
    const handleAgreement = () => {
        fetch("/api/cookies")
            .then(() => setOpen(false));
    };

    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(!CookieHelper.get('cookie_ok'));
    }, []);

    if(!open) return <></>;

    return (
        <Container>
            <CloseButton
                color={Color.GRAY_500}
                hoverColor={Color.GRAY_400}
                clickHandler={handleAgreement}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px'
                }}/>


            <Heading1
                $color={Color.WHITE}
                $styles={headingStyle}
            >This website uses cookies&nbsp;🍪</Heading1>
            <Text font='body' color={Color.WHITE}>
            Freelbee and our third-party website analytics and performance partners use cookies on&nbsp;our website that may collect and use personal information in&nbsp;order to&nbsp;constantly improve website performance and reliability and to&nbsp;provide accurate and relevant information.
                <br/>
            By&nbsp;clicking &laquo;Accept&raquo; you consent to&nbsp;the placement and use of&nbsp;cookies by&nbsp;Freelbee and our third-party partners for these purposes. You can learn more about how this site uses cookies and related technologies by&nbsp;reading our Privacy Policy.
            </Text>


            <Button
                isFit
                isSmallHeight
                styleType={ButtonStyleEnum.GREEN}
                onClick={handleAgreement}
            >Accept</Button>
        </Container>);
};

const Container = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.modal + 1};
  bottom: 16px;
  left: 16px;
  top: auto !important;
  padding: 16px;
  border-radius: 10px;
  background-color: ${Color.GRAY_800};
  width: ${vw(700, Breakpoint.FHD)};
  min-width: 300px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 16px;

  box-shadow: 0px 8px 32px -6px rgba(31, 38, 135, 0.37);

  ${mediaBreakpointDown(Breakpoint.Large)} {
    width: ${vw(500, Breakpoint.Medium)};
    grid-template-columns: 1fr;
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    width: ${vw(500, Breakpoint.Tablet)};
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    left: 8px;
    bottom: 8px;
    width: calc(100% - 32px);
  }
`;

const headingStyle = css`
    grid-column: span 2;
    ${mediaBreakpointDown(Breakpoint.Large)} {
        grid-column: 1;
  }
`;
