'use client'

import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import {ReactComponent as BurgerIcon} from '@freelbee/assets/icons/menu-icons/burger.svg';
import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import { UserMenu } from "../UserMenu";

export const HeadMenu = () => {

    const {setNavigationMenuOpened} = useContext(LayoutContext);

  return (
    <Container>
        <BurgerButton 
            onClick={() => setNavigationMenuOpened(true)}
            aria-label="Open navigation menu"
        >
            <BurgerIcon fill={Color.GRAY_800} />
        </BurgerButton>
        <UserMenu />
    </Container>
  )
}

const BurgerButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;

  ${mediaBreakpointUp(Breakpoint.Medium)} {
    display: none;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    display: none;
  }
`;

const Container = styled.div`
  background-color: ${Color.WHITE};
  border-radius: ${BORDER_RADIUS.M};
  padding: 13px 54px;
  grid-column: span 2;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: 12px 24px;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    padding: 15px 16px;
  }
`;