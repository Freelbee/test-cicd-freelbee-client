'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { visibleMenuItems } from '../data/links';
import { Breakpoint, Color, mediaBreakpointUp } from '@freelbee/shared/ui-kit';
import { usePathname } from 'next/navigation';
import { LowerPanelButton } from './LowerPanelButton';

export default function LowerControlPanel() {
  const pathName = usePathname();

  const isRouteActive = (link: string) => pathName.endsWith(link);

  return (
    <LowerPanel>
      {visibleMenuItems.map(({ link, title, Icon }, i) => (
        <Link key={i} href={link}>
          <LowerPanelButton text={title} Icon={Icon} isActive={isRouteActive(link)} />
        </Link>
      ))}
    </LowerPanel>
  );
}

const LowerPanel = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 11;
  background: ${Color.WHITE};
  width: 100%;
  padding: 10px 20px 8px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  grid-template-rows: 42px;
  justify-content: space-between;
  height: 60px;
  transition: .5s;

  ${mediaBreakpointUp(Breakpoint.xMobile)} {
    display: none;
  }
`;
