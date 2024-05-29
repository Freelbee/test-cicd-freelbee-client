'use client';

import { BORDER_RADIUS, Breakpoint, Color, Z_INDEX, mediaBreakpointDown, mediaBreakpointUp } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';
import { ReactComponent as BurgerIcon } from '@freelbee/assets/icons/menu-icons/burger.svg';
import { useContext } from 'react';
import { LayoutContext } from '../context/LayoutContext';
import { UserMenu } from '../UserMenu';

export const HeadMenu = () => {
  const { setNavigationMenuOpened } = useContext(LayoutContext);

  return (
    <Container>
      <BurgerButton onClick={() => setNavigationMenuOpened(true)} aria-label="Open navigation menu">
        <BurgerIcon fill={Color.GRAY_800} />
      </BurgerButton>
      <UserMenu />
    </Container>
  );
};

const BurgerButton = styled.button`
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: none; //TODO::: remove this line when properly setting up tablet view

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

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    border-radius: 0;
    position: fixed;
    z-index: ${Z_INDEX.header};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    top: 0;
    left: 0;
    right: 0;
  }
`;
