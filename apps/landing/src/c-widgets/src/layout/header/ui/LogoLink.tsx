import Link from "next/link";

import { ReactComponent as LogoIcon} from '@landing/assets/icons/logo/freelbee-logo.svg';
import styled, { css } from "styled-components";
import { Breakpoint, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";

interface Props {
    mobileBreakpoint: number;
}

export const LogoLink = ({mobileBreakpoint}: Props) => {
  return (
    <Link href={`/`}>
        <Logo mobileBreakpoint={mobileBreakpoint}>
            <LogoIcon/>
        </Logo>
    </Link>
  )
}

const Logo = styled.div<{mobileBreakpoint: number}>`
  cursor: pointer;
  width: ${vw(100, Breakpoint.Medium)};
  max-width: 150px;
  transition: .5s;
  svg  {
    width: 100%;
    height: 100%;

  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    width: 100px;
  }

  ${({mobileBreakpoint}) => css`
    ${mediaBreakpointDown(mobileBreakpoint)}{
        position: absolute;
        z-index: 10;
        top: 25px;
        left: 23px;
    }
  `}
`;
