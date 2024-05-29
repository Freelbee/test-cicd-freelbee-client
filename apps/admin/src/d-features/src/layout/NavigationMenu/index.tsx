'use client';

import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { DOMHelper } from '@freelbee/shared/helpers';
import { links } from './data/links';
import { Breakpoint, Color, Z_INDEX, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';
import Image from 'next/image';
import logo from '@freelbee/assets/icons/logo/freelbee-logo.svg';
import { LayoutContext } from '../context/LayoutContext';
import { ReactComponent as CloseIcon } from '@freelbee/assets/icons/cross-icons/close-icon.svg';
import { usePathname } from 'next/navigation';
import { NavigationLink } from '@freelbee/shared/ui-kit';
import { useGetAdminUserQuery } from '@admin/entities';

export function NavigationMenu() {
  const pathName = usePathname();
  const refWrapper = useRef<HTMLDivElement>(null);
  const refNavigation = useRef<HTMLDivElement>(null);
  const { navigationMenuOpened, setNavigationMenuOpened } = useContext(LayoutContext);

  const { data: adminUser } = useGetAdminUserQuery();

  const isRouteActive = (link: string) => {
    if (link === '/companies') {
      return pathName.endsWith(link) || /^\/companies\/\d+$/.test(pathName);
    }
    return pathName.endsWith(link);
  };

  const closeMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    DOMHelper.isNotChildOfElem(e) && setNavigationMenuOpened(false);
  };

  const isPageAdminsVisible = adminUser?.authorities.includes("CREATE__ADMINS");
  const linksFiltered = links.filter(link => {
    if (link.link === '/admins') {
      return isPageAdminsVisible;
    }
    return true;
  });

  return (
    <NavigationWrapper
      ref={refWrapper}
      $isOpen={navigationMenuOpened}
      onClick={(e) => closeMenu(e)}
    >
      <NavigationContent ref={refNavigation} $isOpen={navigationMenuOpened}>
        <Links>
          <NavigationLogo>
            <Image width={95} height={23} src={logo} alt="Freelbee logo" />
            <button onClick={() => setNavigationMenuOpened(false)}>
              <CloseIcon stroke={Color.GRAY_600} />
            </button>
          </NavigationLogo>
          <div>
            {linksFiltered.map((link) => (
              <NavigationLink key={link.title} isActive={isRouteActive(link.link)} {...link} />
            ))}
          </div>
        </Links>
      </NavigationContent>
    </NavigationWrapper>
  );
}

const NavigationWrapper = styled.div<{ $isOpen: boolean }>`
  position: relative;
  overflow-x: hidden;
  width: 100%;
  min-width: 200px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    position: fixed;
    z-index: ${Z_INDEX.navigationMenu};
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    transition: opacity 0.5s, visibility 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    visibility: ${(({ $isOpen }) => $isOpen ? 'visible' : 'hidden')};
    opacity: ${(({ $isOpen }) => $isOpen ? 1 : 0)};
  }
`;

const NavigationContent = styled.div<{ $isOpen: boolean }>`
  position: sticky;
  transition: bottom 0.5s, left 0.5s;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 220px;
  height: ${vw(460, Breakpoint.Large)};
  max-height: 460px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    position: relative;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    left: ${({ $isOpen }) => $isOpen ? '0' : '-250px'};
  }
`;

const Links = styled.nav`
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px 8px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: unset;
  }
`;

const NavigationLogo = styled.div`
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 34px;

  button {
    display: none;
    cursor: pointer;
    width: 18px;
    height: 18px;
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      display: block;
    }
  }
`;
