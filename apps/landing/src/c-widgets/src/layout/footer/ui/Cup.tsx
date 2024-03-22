'use client';

import { Breakpoint, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import cupIcon from '@landing/assets/images/cup.svg';
import Image from 'next/image';

export const Cup = () => {
  return (
    <CupIconContainer>
        <Image src={cupIcon} fill alt='Decorative icon'/>                      
    </CupIconContainer>
  )
}


const CupIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0px;
  max-width: 84px;
  max-height: 87px;
  width: ${vw(84, Breakpoint.Large)};
  height: ${vw(87, Breakpoint.Large)};
  
  img {
    object-fit: contain;
  }

  ${mediaBreakpointDown(Breakpoint.Large)} {
    right: 16px;
    width: ${vw(84, Breakpoint.Medium)};
    height: ${vw(87, Breakpoint.Medium)};
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    right: 10px;
    width: ${vw(94, Breakpoint.xMobile)};
    height: ${vw(97, Breakpoint.xMobile)};
  }
`;