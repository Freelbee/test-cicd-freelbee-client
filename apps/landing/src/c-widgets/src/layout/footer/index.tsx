'use client';

import styled from 'styled-components';

import logoIcon from "@freelbee/assets/icons/logo/freelbee-logo.svg";
import rateImg from '@landing/assets/images/rate.svg';
import {ReactComponent as LocationIcon} from '@freelbee/assets/icons/location/location.svg';
import {ReactComponent as MailIcon} from '@freelbee/assets/icons/mail/mail.svg';
import {ReactComponent as PhoneIcon} from '@freelbee/assets/icons/phone/call.svg';

import { Breakpoint, mediaBreakpointDown, mediaBreakpointUp, vw, Heading3, Color, typography } from '@freelbee/shared/ui-kit';
import { LinkButton, LinkStyle } from "@freelbee/shared/ui-kit";
import { DOC_LINKS } from './data/documentLinks';
import { NAV_LINKS } from './data/navigationLinks';
import { FooterBottom } from './ui/FooterBottom';
import { Cup } from './ui/Cup';
import { SectionId } from '@landing/entities';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();

    const getNavUrlRelativeToMain = (url: string) => {
        if(url.startsWith('_') && pathname !== '/') {
            return `/#${url}`;
        } else {
            return `#${url}`;
        }
    };

    return (
        <>
            <Container id={SectionId.CONTACTS}>
                <Content>
                <FooterLogo><Image
                        src={logoIcon}
                        alt='Freelbee logo'
                        fill /></FooterLogo>

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
                                href={getNavUrlRelativeToMain(link.url)}>
                                {link.text}
                            </LinkButton>
                        ))}
                    </NavBlock>

                    <LinksBlock>
                        <Heading3>Contact us</Heading3>

                        <LinkWithIcon>
                            <MailIcon />
                            <a href={`mailto: ${process.env.NEXT_PUBLIC_EMAIL}`}>
                                {process.env.NEXT_PUBLIC_EMAIL}
                            </a>
                        </LinkWithIcon>

                        <LinkWithIcon>
                            <PhoneIcon />
                            <a href={`tel: ${process.env.NEXT_PUBLIC_PHONE}`}>
                                {process.env.NEXT_PUBLIC_PHONE}
                            </a>
                        </LinkWithIcon>

                        <LinkWithIcon>
                            <LocationIcon/>
                            <span>The offices at Ibn Battuta Gate 16-0,</span>
                            <span>Jabal Ali First 591-0, Dubai, UAE</span>
                        </LinkWithIcon>
                    </LinksBlock>

                    <RateWrapper
                        aria-label='View company reviews on the g2 website'
                        href='https://www.g2.com/products/freelbee/reviews'
                        target='_blank'>
                        <Image src={rateImg} width={120} height={61} alt='Company rating' />
                        <div itemProp="itemReviewed" itemScope itemType="https://schema.org/Organization">
                            <meta itemProp="name" content="Freelbee - contractor payment platform"/>
                            <div itemProp="aggregateRating" itemScope itemType="http://schema.org/AggregateRating">
                                <meta itemProp="bestRating" content="5"/>
                                <meta itemProp="ratingValue" content="4.9"/>
                                <span itemProp="ratingCount">3</span> reviews
                            </div>
                        </div>
                    </RateWrapper>

                    <Cup />

                </Content>
            </Container>
            <FooterBottom />
        </>
    );
}

const Container = styled.footer`
  background: ${Color.GRAY_300};
  display: flex;
  justify-content: center;
`;

const RateWrapper = styled.a`
  width: 116px;
  height: 58px;

  div:last-child {
    visibility: hidden;
  }

  ${mediaBreakpointUp(Breakpoint.Medium)} {
    position: absolute;
    top: 120px;
    left: ${vw(76, Breakpoint.Large)};
  }
`;

const LinksBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LinkWithIcon = styled.div`
  ${typography.body};
  color: ${Color.GRAY_800};
  display: grid;
  grid-template-columns: 20px auto;
  align-items: flex-start;
  gap: 6px;

  svg {
    width: 18px;
    height: 18px;
    margin-top: 2px;
    stroke: ${Color.GRAY_800};
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
      /* gap: 16px; */
      grid-template-columns: 1fr;
      padding-right: ${vw(20, Breakpoint.xMobile)};
      padding-left: ${vw(20, Breakpoint.xMobile)};
  }
`;

const FooterLogo = styled.div`
  flex-shrink: 0;
  position: relative;
  width: ${vw(100, Breakpoint.Medium)};
  height: 36px;
  max-width: 150px;
  min-width: 120px;


  ${mediaBreakpointDown(Breakpoint.Medium)} {
    grid-column: 1/4;
    width: 120px;
    height: 30px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-column: 1;
  }
`;
