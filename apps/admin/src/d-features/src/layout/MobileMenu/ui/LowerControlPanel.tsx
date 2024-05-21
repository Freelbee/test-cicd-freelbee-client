'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { visibleMenuItems } from '../data/links';
import { Breakpoint, Color, mediaBreakpointUp } from '@freelbee/shared/ui-kit';
import { usePathname } from 'next/navigation';
import { LowerPanelButton } from './LowerPanelButton';

export default function LowerControlPanel() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.classList.add(`stop-scrolling`);
    else document.body.classList.remove(`stop-scrolling`);
  }, [isOpen]);

  const isRouteActive = (link: string) => pathName.endsWith(link);

  return (
    <>
      <LowerPanel $isOpen={isOpen}>
        {visibleMenuItems.map(({ link, title, Icon }, i) => (
          <Link key={i} href={link}>
            <LowerPanelButton text={title} Icon={Icon} isActive={isRouteActive(link)} />
          </Link>
        ))}
      </LowerPanel>
    </>
  );
}

const LowerPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${({ $isOpen }) => $isOpen ? '-100%' : 0};
  z-index: 11;
  background: ${Color.WHITE};
  width: 100%;
  padding: 10px 20px 8px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  grid-template-rows: 42px;
  justify-content: space-between;
  box-shadow: ${({ $isOpen }) => $isOpen && '0 4px 64px rgb(0 0 0 / 10%)'};
  height: 60px;
  transition: .5s;

  ${mediaBreakpointUp(Breakpoint.xMobile)} {
    display: none;
  }
`;
