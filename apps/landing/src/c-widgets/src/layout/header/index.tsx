'use client';

import React, {useEffect, useRef} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion, useCycle } from 'framer-motion';

import {Color, Z_INDEX, mediaBreakpointDown, mediaBreakpointUp, Breakpoint, typography } from '@freelbee/shared/ui-kit';
import { useDimensions, useMatchMedia, useOnClickOutside } from "@freelbee/shared/hooks";

import { NAV_LINKS } from './data/links';
import { LoginButton } from './ui/LoginButton';
import { LogoLink } from './ui/LogoLink';


const SWITCH_TO_BURGER_BREAKPOINT = 1080;

const sidebar = {
    opened: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 300}px at calc(100vw - 20px) 20px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        }
    }),
    closed: {
        clipPath: "circle(20px at calc(100vw - 20px) 20px)",
        transition: {
            type: "spring",
            stiffness: 20,
            damping: 10,
        }
    }
};

const list = {
    opened: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const item = {
    closed: (isDesktop = false) => ({
        y: 0,
        opacity: isDesktop ? 1 : 0,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    }),
    opened: (isDesktop = false) => ({
        y: isDesktop ? 0 : 30,
        opacity: 1,
        transition: {
            y: { stiffness: 1000 }
        }
    }),
};

export const Header = () => {
    const menuRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const burgerRef = useRef<HTMLButtonElement | null>(null);
    const isDesktop = useMatchMedia(`(min-width: ${SWITCH_TO_BURGER_BREAKPOINT}px)`);

    const [isOpen, toggleOpen] = useCycle(false, true);
    const { height } = useDimensions(menuRef);

    useOnClickOutside(menuRef, () => {
        if(isOpen) {
            toggleOpen();
        }
    }, burgerRef);

    useEffect(() => {
        const resizeMenu = () => {
            if(isDesktop && isOpen) {
                toggleOpen();
            }
        };
        addEventListener(`resize`, resizeMenu);
        return () => {
            // setIsOpen(false);
            removeEventListener(`resize`, resizeMenu);
        };
    }, []);

    const renderLinks = () => NAV_LINKS.map(({text, url}) => (
        <motion.li variants={item} key={text} custom={isDesktop}>
            <Link href={`#${url}`} onClick={() => toggleOpen()}>
                <PageLink
                    $isActive={false}>
                    {text}
                </PageLink>
            </Link>
        </motion.li>
    ));

    return (
        <>
            <HeaderVoid />
            <Container
                ref={headerRef}
                $isOnTop={false}>
                <Content>
                    <LogoLink mobileBreakpoint={SWITCH_TO_BURGER_BREAKPOINT} />

                    <LinksContainer
                        $isOpen={isOpen}
                        $isDesktop={isDesktop}
                        ref={menuRef}
                        initial={false}
                        variants={sidebar}
                        animate={(isOpen || isDesktop) ? "opened" : "closed"}
                        custom={height}
                    >
                        <Links
                            variants={list}>
                            {renderLinks()}
                        </Links>
                        <LoginMobile variants={item} key='login'>
                            <LoginButton data-testid={'login-mobile-button'}/>
                        </LoginMobile>
                    </LinksContainer>

                    <LoginDesktop>
                        <LoginButton />
                    </LoginDesktop>

                    <BurgerButton
                        data-testid={'header-menu-button'}
                        ref={burgerRef}
                        $isOpen={isOpen}
                        aria-label={isOpen ? 'close menu' : 'open menu'}
                        onClick={() => toggleOpen()}>
                    </BurgerButton>
                </Content>
            </Container>
        </>
    );
}

const Container = styled(motion.div)<{$isOnTop: boolean}>`
  z-index: ${Z_INDEX.header};
  top: 0;
  left: 0;
  position: fixed;
  background-color: ${({$isOnTop}) => $isOnTop ? `transparent` : `white`};
  box-shadow:${({$isOnTop}) => $isOnTop ? `0px 4px 44px rgba(0, 0, 0, 0)` : `0px 4px 44px rgba(0, 0, 0, 0.05)`};
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 48px;
  transition: background-color .3s, box-shadow .3s, height .3s;

  @media (max-width: 750px) {
    padding: 0 24px;
  }

  @media (max-width: 375px) {
    padding: 0 16px;
  }
`;

const HeaderVoid = styled.div`
  min-height: 80px;
  width: 100%;
`;

const LoginDesktop = styled.div`
    ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)}{
      display: none;
    }
`;

const LoginMobile = styled(motion.div)`
  display: none;

  ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)} {
    padding-top: 64px;
    padding-bottom: 16px;
    display: block;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
      padding-top: 0;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  height: 44px;
`;

const BurgerButton = styled.button<{$isOpen: boolean}>`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 23px;
  z-index :10;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${Color.GRAY_400};
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: ${Color.WHITE};
  }

  ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)}{
    display: flex;
  }

    &::before , &::after{
      content: '';
      position: absolute;
      width: 60%;
      height: 1px;
      background-color: ${Color.GRAY_900};
      transition: transform 0.3s;
    }

    &::after {
      top: 16px;
      transform: ${({$isOpen}) => $isOpen && 'translateY(2.5px) rotate(136deg)'};
    }

    &::before {
      top: 22.5px;
      transform: ${({$isOpen}) => $isOpen && 'translateY(-3.5px) rotate(46deg)'};
    }
`;

const LinksContainer = styled(motion.nav)<{$isOpen: boolean, $isDesktop: boolean}>`
  clip-path: ${({$isDesktop}) => $isDesktop && 'unset !important'};
  ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)}{
    position: fixed;
    z-index: 9;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    padding: 23px;
    top: 0;
    right: 0;
    width: 100%;
    padding-bottom: 32px;
    background-color: ${Color.WHITE};

    transform: translate3d(0,0,0);
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    flex-direction: column;
  }
`;

const Links = styled(motion.ul)`
  display: flex;
  gap: 8px;

  ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)}{
    flex-direction: column;
    gap: 16px;
    padding-top: 64px;
    padding-bottom: 48px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)}{
    padding-bottom: 16px;
  }

  li {
    ${mediaBreakpointUp(SWITCH_TO_BURGER_BREAKPOINT)}{
      transform: translateY(0) !important;
    }
  }
`;

const PageLink = styled.span<{$isActive?: boolean}>`
  ${typography.body};
  padding: 8px;
  border-radius: 4px;
  transition: color .5s, background-color 0.5s;
  color: ${Color.GRAY_700};
  cursor: pointer;

  &:hover {
    color: ${Color.GRAY_900};
  }
  ${mediaBreakpointDown(SWITCH_TO_BURGER_BREAKPOINT)}{
    font-size: 20px;
  }
`;
