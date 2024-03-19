'use client';

import styled from 'styled-components';

import { ReactComponent as LogoIcon} from "@landing/assets/icons/logo/freelbee-logo.svg";
import { ReactComponent as LocationIcon} from '@freelbee/assets/icons/location/location.svg';
import { ReactComponent as MailIcon} from '@freelbee/assets/icons/mail/mail.svg';

import { Breakpoint, mediaBreakpointDown, mediaBreakpointUp, vw, Heading3, Text, Color } from '@freelbee/shared/ui-kit';
import { LinkButton, LinkStyle } from '@freelbee/features/common';
import { DOC_LINKS } from './data/documentLinks';
import { NAV_LINKS } from './data/navigationLinks';
import { FooterBottom } from './ui/FooterBottom';
import { Cup } from './ui/Cup';
import { SectionId } from '@landing/entities';

export const Footer = () => {
    return (
        <>
            <Container id={SectionId.CONTACTS}>
                <Content>
                    <FooterLogo><LogoIcon/></FooterLogo>

                    <LinksBlock>
                        <Heading3>Legal</Heading3>
                        {DOC_LINKS.map(link => (
                            <LinkButton
                                key={link.text}
                                font='body'
                                as='Link'
                                target='_blank'
                                linkStyle={LinkStyle.GRAY}
                                href={link.url}>
                                {link.text}
                            </LinkButton>
                        ))}
                    </LinksBlock>

                    <NavBlock>
                        <Heading3>Navigation</Heading3>
                        {NAV_LINKS.map(link => (
                            <LinkButton
                                key={link.text}
                                font='body'
                                as='Link'
                                linkStyle={LinkStyle.GRAY}
                                href={'#' + link.url}>
                                {link.text}
                            </LinkButton>
                        ))}
                    </NavBlock>

                    <LinksBlock>
                        <Heading3>Contact us</Heading3>
                        <Text
                            font='body'
                            as='div'
                            color={Color.GRAY_600}>
                            <LinkWithIcon>
                                <MailIcon />
                                <a href={`mailto: ${process.env.NEXT_PUBLIC_EMAIL}`}>
                                    {process.env.NEXT_PUBLIC_EMAIL}
                                </a>
                            </LinkWithIcon>

                        </Text>
                        <Text
                            font='body'
                            as='div'
                            color={Color.GRAY_600}>
                            <LinkWithIcon>
                                <LocationIcon/>
                                <span>Office No. 1101-225 King of Tides</span>
                                <span>Ships Limited - Jebel Ali Al Wali, Dubai, UAE. </span>
                            </LinkWithIcon>
                        </Text>
                    </LinksBlock>

                    <Cup />

                </Content>
            </Container>
            <FooterBottom />
        </>
    );
}

const Container = styled.div`
  background: ${Color.GRAY_300};
  display: flex;
  justify-content: center;
`;

const LinksBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkWithIcon = styled.div`
  display: grid;
  grid-template-columns: 20px auto;
  align-items: flex-start;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    stroke: ${Color.GRAY_600};
  }

  span:last-child {
    grid-column: 2;
  }
`;

const NavBlock = styled(LinksBlock)`
  ${mediaBreakpointUp(Breakpoint.Medium)} {
    display: none;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-row: 2;
  }
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: ${vw(128, Breakpoint.Large)};
  align-items: flex-start;
  position: relative;
  padding-top: 60px;
  padding-bottom: 60px;

  max-width: 1440px;
  padding-right: ${vw(76, Breakpoint.Large)};
  padding-left: ${vw(76, Breakpoint.Large)};

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
      padding-right: ${vw(76, Breakpoint.xMedium)};
      padding-left: ${vw(76, Breakpoint.xMedium)};
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
      gap: 24px;
      padding-top: 30px;
      padding-bottom: 30px;
      padding-right: ${vw(40, Breakpoint.Medium)};
      padding-left: ${vw(40, Breakpoint.Medium)};
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
      gap: 16px;
      grid-template-columns: 1fr;
      padding-right: ${vw(20, Breakpoint.xMobile)};
      padding-left: ${vw(20, Breakpoint.xMobile)};
  }
`;

const FooterLogo = styled.div`
  flex-shrink: 0;
  width: ${vw(100, Breakpoint.Medium)};
  max-width: 150px;

  svg {
    width: 100%;
    height: 100%;
  }
  ${mediaBreakpointDown(Breakpoint.Medium)} {
    grid-column: 1/4;
    width: 120px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-column: 1;
  }
`;
