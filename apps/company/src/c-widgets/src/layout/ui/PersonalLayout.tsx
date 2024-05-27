'use client'

import { HeadMenu, LayoutContext, MobileMenu, NavigationMenu, OnboardingNotification } from "@company/features"
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { PropsWithChildren, useEffect, useState } from 'react';
import styled from "styled-components"
import { OnboardingModal } from "../../onboarding"
import {
  useIsAuthenticatedQuery, useGetCompanyOnboardingStateQuery
} from '@company/entities';
import {CompanyAuthModal} from "../../auth/CompanyAuthModal";
import { usePathname, useRouter } from 'next/navigation';

export const PersonalLayout = ({ children }: PropsWithChildren) => {

  const pathname = usePathname();
  const router = useRouter();

  const [navigationMenuOpened, setNavigationMenuOpened] = useState<boolean>(false);


  const { data: isAuthenticated, isLoading: isAuthenticatedLoading } = useIsAuthenticatedQuery();
  const {
    data: onboardingState,
    isLoading
  } = useGetCompanyOnboardingStateQuery(undefined, { skip: !isAuthenticated || isAuthenticatedLoading });

  const isOnboardingPassed = () => {
    return onboardingState && Object.values(onboardingState).every(step => !!step);
  };

  useEffect(() => {
    if (isAuthenticated && pathname.includes('sign-up')) {
      router.push('/')
    }
  }, [isAuthenticated]);

  return (
    <LayoutContext.Provider value={{
      navigationMenuOpened,
      setNavigationMenuOpened
    }}>
      <Container>
        {!isAuthenticated && !isAuthenticatedLoading && <CompanyAuthModal />}
        {isAuthenticated && (
          <>
            <OnboardingModal />
            <HeadMenu />
            <NavigationMenu />
            <MobileMenu />
            <Main>
              {!isLoading && isOnboardingPassed() && children}
              {!isLoading && !isOnboardingPassed() && <OnboardingNotification />}
            </Main>
          </>
        )}
      </Container>
    </LayoutContext.Provider>
  );
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
