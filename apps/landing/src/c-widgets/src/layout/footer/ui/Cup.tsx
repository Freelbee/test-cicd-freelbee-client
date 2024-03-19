'use client';

import { Breakpoint, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import { ReactComponent as CupIcon} from '@landing/assets/images/main/cup.svg';

export const Cup = () => {
  return (
    <CupIconContainer>
        <CupIcon />
    </CupIconContainer>
  )
}


const CupIconContainer = styled.div`
  position: absolute;
  bottom: -3px;
  right: 0px;
  max-width: 74px;
  width: ${vw(74, Breakpoint.Large)};

  ${mediaBreakpointDown(Breakpoint.Large)} {
    right: 16px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    right: 10px;
    width: ${vw(64, Breakpoint.xMobile)};
  }
`;
