'use client';

import styled from "styled-components";
import {Breakpoint, CloseButton, mediaBreakpointDown, ModalWindow} from "@freelbee/shared/ui-kit";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import {AuthModalState} from "./Types";
import {Dispatch, SetStateAction} from "react";
import {AuthDto, RegistrationDto, SessionDto} from "@freelbee/entities";

type Props = {
  authModalState: AuthModalState;
  setAuthModalState: Dispatch<SetStateAction<AuthModalState>>;
  registerUser: (dto: RegistrationDto) => void;
  userRegSession: unknown;
  checkCode: (code: string) => void;
  resendCode: () => void;
  authUser: (dto: AuthDto) => void;
  checkAuthCode: (code: string) => void;
  resendAuthCode: () => void;
  userAuthSession: () => void;
}

export const AuthModal = (props: Props) => {
  const { authModalState, setAuthModalState, registerUser, userRegSession, checkCode, resendCode,
    authUser, checkAuthCode, resendAuthCode, userAuthSession} = props;

  const onModalClose = () => {
    setAuthModalState(AuthModalState.Closed);
  }

  return (
    <ModalWindow
      isOpen={authModalState !== AuthModalState.Closed}
      onClose={onModalClose}>
      <AuthContainer>
        <CloseContainer>
          <CloseButton clickHandler={onModalClose}/>
        </CloseContainer>
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

const CloseContainer = styled.div`
  z-index: 1;
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    top: 20px;
    right: 20px;
  }
`;
