'use client'

import { SettingsMenu, SliderMenu } from "@freelancer/features"
import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp } from "@freelbee/shared/ui-kit"
import { PropsWithChildren } from "react"
import styled, { css } from "styled-components"

export const SettingsLayout = ({children}: PropsWithChildren) => {
  return (
    <Container>
        <Main>
          <SliderMenu styles={mobileMenuStyles} />
          {children}      
        </Main>
        <SettingsMenu />
    </Container>      
  )
}

const Container = styled.div`
  width: 100%;
  background-color: ${Color.GRAY_200};
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    row-gap: 0px;
    column-gap: 0px;
    grid-template-columns: 1fr;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
  }
`;

const Main = styled.div`
  overflow: hidden;
  background-color: ${Color.WHITE};
  border-radius: ${BORDER_RADIUS.L};
  padding: 32px;
  display: grid;
  gap: 32px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
      padding: 24px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
      padding: 16px;
      gap: 24px;
  }
`;

const mobileMenuStyles = css`
  ${mediaBreakpointUp(Breakpoint.Medium)} {
      display: none;
  }
`