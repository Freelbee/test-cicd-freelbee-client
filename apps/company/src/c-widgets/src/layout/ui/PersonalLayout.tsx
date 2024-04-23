'use client'

import { HeadMenu, LayoutContext, MobileMenu, NavigationMenu, OnboardingNotification } from "@company/features"
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { PropsWithChildren, useState } from "react"
import styled from "styled-components"
import { OnboardingModal } from "../../onboarding"
import { useGetUserQuery } from "@company/entities"

export const PersonalLayout = ({children}: PropsWithChildren) => {
  
  const [navigationMenuOpened, setNavigationMenuOpened] = useState<boolean>(false);
  const {data: user} = useGetUserQuery();

  return (
    <LayoutContext.Provider value={{
      navigationMenuOpened,
      setNavigationMenuOpened,
    }}>
      <Container>
        <OnboardingModal />

        <HeadMenu />
        <NavigationMenu />
        <MobileMenu />
        <Main>
          {/* {children} */}
          {!user?.userData.status ?
            <OnboardingNotification />
            :
            children
          }
        </Main>
      </Container>      
    </LayoutContext.Provider>

  )
}

const Container = styled.div`
  max-width: 1400px;
  margin: auto;
  background-color: ${Color.GRAY_200};
  padding: 24px 50px 50px 50px;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  gap: 20px;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: 24px 41px 41px 41px;
    row-gap: 24px;
    column-gap: 0px;
    grid-template-columns: 1fr;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    padding: 24px 16px 24px 16px;
    row-gap: 16px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 94px 10px 60px 10px;
  }
`;

const Main = styled.main`
`;