'use client'

import { HeadMenu, LayoutContext, MobileMenu, NavigationMenu } from "@freelancer/features"
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit"
import { PropsWithChildren, useState } from "react"
import styled from "styled-components"
import {AuthModal, AuthModalState} from "@freelbee/widgets";
import {
  authApi,
  useRegisterFreelancerMutation, useResendFreelancerAuthConfirmationMutation,
  useResendFreelancerConfirmationMutation, useSendFreelancerAuthConfirmationMutation,
  useSendFreelancerRegConfirmationMutation, useSignInFreelancerMutation
} from "@freelancer/entities";
import {SessionDto} from "@freelbee/entities";
import {useDispatch} from "react-redux";

import { OnboardingModal } from "../onboarding"
// import { useGetUserQuery } from "@freelancer/entities"

export const PersonalLayout = ({children}: PropsWithChildren) => {

  const [navigationMenuOpened, setNavigationMenuOpened] = useState<boolean>(false);
  // const {data: user} = useGetUserQuery();

  const [registerUser] = useRegisterFreelancerMutation();
  const [checkCode] = useSendFreelancerRegConfirmationMutation();
  const [resendCode] = useResendFreelancerConfirmationMutation();

  const [authUser] = useSignInFreelancerMutation();
  const [checkAuthCode] = useSendFreelancerAuthConfirmationMutation();
  const [resendAuthCode] = useResendFreelancerAuthConfirmationMutation();

  const dispatch = useDispatch<any>();

  const userRegSession = async (): Promise<SessionDto> => {
    const res = dispatch(authApi.endpoints.getFreelancerRegSession.initiate({ timestamp: Date.now() }));
    return res.data;
  }

  const userAuthSession = async (): Promise<SessionDto> => {
    const res = await dispatch(authApi.endpoints.getFreelancerAuthSession.initiate({ timestamp: Date.now() }));
    return res.data;
  }

  return (
    <LayoutContext.Provider value={{
      navigationMenuOpened,
      setNavigationMenuOpened,
    }}>
      <Container>
        <AuthModal
          authModalState={AuthModalState.Login}
          registerUser={registerUser}
          userRegSession={userRegSession}
          checkCode={checkCode}
          resendCode={resendCode}

          authUser={authUser}
          checkAuthCode={checkAuthCode}
          resendAuthCode={resendAuthCode}
          userAuthSession={userAuthSession}
        />

        <OnboardingModal />

        <HeadMenu />
        <NavigationMenu />
        <MobileMenu />
        <Main>
          {/* {!user?.userData.status ?
            <OnboardingNotification />
            :
            children
          } */}
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
