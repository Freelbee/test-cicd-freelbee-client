'use client';

import React, { useEffect, useState} from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {ReactComponent as MoreIcon} from '@freelbee/assets/icons/menu-icons/more.svg';
import { visibleMenuItems } from '../data/links';
import { LowerMenu } from './LowerMenu';
import { Breakpoint, Color, Z_INDEX, mediaBreakpointUp} from '@freelbee/shared/ui-kit';
import { usePathname } from 'next/navigation';
import { LowerPanelButton } from './LowerPanelButton';


export default function LowerControlPanel () {

    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    
    useEffect(()=>{
        if(isOpen)
            document.body.classList.add(`stop-scrolling`);
        else
            document.body.classList.remove(`stop-scrolling`);

    }, [isOpen]);

    const isRouteActive = (link: string) => {
        if(link === '/') return pathName === link;
        return pathName.endsWith(link);
      };

    return (
        <>
            <LowerPanel $isOpen={isOpen}>
                {
                    visibleMenuItems.map(({link, title, Icon}, i) => (
                        <Link key={i} href={link}>
                            <LowerPanelButton text={title} Icon={Icon} isActive={isRouteActive(link)} />
                        </Link>
                    ))
                }

                <LowerPanelButton 
                    onClick={() => setIsOpen(prev=>!prev)} 
                    Icon={MoreIcon}
                    text='More'
                />
            </LowerPanel>
            <LowerMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    );
}

const LowerPanel = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  bottom: ${({$isOpen}) => $isOpen ? '-100%' : 0};
  z-index: ${Z_INDEX.modal - 1};
  background: ${Color.WHITE};
  width: 100%;
  padding: 10px 20px 8px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 40px);
  grid-template-rows: 42px;
  justify-content: space-between;
  box-shadow: ${({$isOpen}) => $isOpen && '0 4px 64px rgb(0 0 0 / 10%)' };
  height: 60px;
  transition: .5s;

  ${mediaBreakpointUp(Breakpoint.xMobile)} {
    display: none;
  }
`;

