'use client';

import {CloseButton, ModalWindow} from "@freelbee/features/common";
import styled from "styled-components";
import {Breakpoint, mediaBreakpointDown} from "@freelbee/shared/ui-kit";
import {useState} from "react";
import Login from "./login/Login";
import Registration from "./registration/Registration";
import {AuthModalState} from "./Types";

type Props = {
  authModalState?: AuthModalState;
  registerUser: any;
  userRegSession: any;
  checkCode: any;
  resendCode: any;
  authUser: any;
  checkAuthCode: any;
  resendAuthCode: any;
  userAuthSession: any;
}

export const AuthModal = (props: Props) => {
  const { authModalState = AuthModalState.Closed, registerUser, userRegSession, checkCode, resendCode,
    authUser, checkAuthCode, resendAuthCode, userAuthSession} = props;
  const [modalState, setModalState] = useState<AuthModalState>(authModalState)

  const onModalClose = () => {
    setModalState(AuthModalState.Closed);
  }

  return (
    <ModalWindow
      isOpen={modalState !== AuthModalState.Closed}
      onClose={onModalClose}>
      <AuthContainer>
        <CloseContainer>
          <CloseButton clickHandler={onModalClose}/>
        </CloseContainer>
        <Login
          isOpen={modalState === AuthModalState.Login}
          authUser={authUser}
          checkAuthCode={checkAuthCode}
          resendAuthCode={resendAuthCode}
          userAuthSession={userAuthSession}
        />
        <Registration
          isOpen={modalState === AuthModalState.Register}
          registerUser={registerUser}
          userRegSession={userRegSession}
          checkCode={checkCode}
          resendCode={resendCode}
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
