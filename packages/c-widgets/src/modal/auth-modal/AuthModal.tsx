'use client';

import styled from "styled-components";
import {Breakpoint, mediaBreakpointDown, ModalWindow} from "@freelbee/shared/ui-kit";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import {AuthModalState} from "./Types";
import {Dispatch, SetStateAction} from "react";
import {AuthDto, RegistrationDto, SessionDto} from "@freelbee/entities";

type Props = {
  authModalState: AuthModalState;
  setAuthModalState: Dispatch<SetStateAction<AuthModalState>>;
  registerUser: (dto: RegistrationDto) => Promise<void>
  userRegSession: () => Promise<SessionDto>;
  checkCode: (code: string) => Promise<void>;
  resendCode: () => Promise<void>;
  authUser: (dto: AuthDto) => Promise<void>;
  checkAuthCode: (code: string) => Promise<void>;
  resendAuthCode: () => Promise<void>;
  userAuthSession: () => Promise<SessionDto>;
}

export const AuthModal = (props: Props) => {
  const { authModalState, setAuthModalState, registerUser, userRegSession, checkCode, resendCode,
    authUser, checkAuthCode, resendAuthCode, userAuthSession} = props;

  return (
    <ModalWindow
      isOpen={authModalState !== AuthModalState.Closed}
      onClose={() => {}}>
      <AuthContainer>
        {/*<CloseContainer>*/}
        {/*  <CloseButton clickHandler={onModalClose}/>*/}
        {/*</CloseContainer>*/}
        <Login
          isOpen={authModalState === AuthModalState.Login}
          authUser={authUser}
          checkAuthCode={checkAuthCode}
          resendAuthCode={resendAuthCode}
          userAuthSession={userAuthSession}
          setModalState={setAuthModalState}
        />
        <Registration
          isOpen={authModalState === AuthModalState.Register}
          registerUser={registerUser}
          userRegSession={userRegSession}
          checkCode={checkCode}
          resendCode={resendCode}
          setModalState={setAuthModalState}
        />
      </AuthContainer>
    </ModalWindow>
  );
};

const AuthContainer = styled.div`
  position: relative;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: .5s;
  margin: auto;
  background: #ffffff;
  width: 100%;
  height: 100%;
  max-height: 700px;
  max-width: 1000px;
  overflow: hidden;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    max-height: 600px;
    padding: 24px 0;
  }
`;

