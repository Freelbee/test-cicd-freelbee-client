'use client'

import { HeadMenu, LayoutContext, MobileMenu, NavigationMenu } from "@company/features"
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { PropsWithChildren, useState } from "react"
import styled from "styled-components"

export const PersonalLayout = ({children}: PropsWithChildren) => {
  
  const [navigationMenuOpened, setNavigationMenuOpened] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{
      navigationMenuOpened,
      setNavigationMenuOpened,
    }}>
      <Container>
        <HeadMenu />
        <NavigationMenu />
        <MobileMenu />
        <Main>
          {children}        
        </Main>
      </Container>      
    </LayoutContext.Provider>

  )
}

const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  background-color: ${Color.GRAY_200};
  padding: 24px 50px 0px 50px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: 20px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: 24px 41px 0px 41px;
    gap: 24px;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    padding: 24px 16px 0px 16px;
    gap: 16px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 94px 10px 0px 10px;
  }
`;

const Main = styled.main`
`;