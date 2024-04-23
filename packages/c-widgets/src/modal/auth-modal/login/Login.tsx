'use client'
import React, {useState} from 'react';


import AuthLayout from '../AuthLayout';
import AuthContainer from "../AuthContainer";
import LoginForm from "./LoginForm";
import {LoginSteps} from "../registration/AuthSteps";
import {LoginContext} from "./LoginContext";
import EmailConfirmation from "../registration/EmailConfirmation";
import {AuthDto} from "@freelbee/entities";
import {AuthModalState} from "@freelbee/widgets";

type Props = {
  isOpen: boolean;
  authUser: any;
  checkAuthCode: any;
  resendAuthCode: any;
  userAuthSession: any;
  setModalState: any;
};

export default function Login(props: Props) {
  const {isOpen, authUser, checkAuthCode, resendAuthCode, userAuthSession, setModalState} = props;
  const [step, setStep] = useState<LoginSteps>(LoginSteps.SEND_CREDENTIALS);
  const [loginData, setLoginData] = useState<AuthDto>({
    email: '',
    password: ``
  })

  const data = {
    sidebarTitle: `Log in`,
    sidebarText: `Don’t have an account?`,
    sidebarLinkText: `Sign up`,
  };

  const loginSteps = [
    {step: LoginSteps.SEND_CREDENTIALS, text: 'Fill credentials'},
    {step: LoginSteps.CHECK_CODE, text: 'Confirm your e-mail'},
  ];

  return (
    <AuthContainer isOpen={isOpen}>
      <LoginContext.Provider value={{loginData, setLoginData, step, setStep}}>
        <AuthLayout
          context={LoginContext}
          steps={loginSteps}
          data={data}
          onClick={() => {
            setModalState(AuthModalState.Register)
            /*router.push(router.asPath.replace('sign-in', 'sign-up'));
            setAuthModalState(AuthModalState.Register);*/
          }}
        >
          {step === LoginSteps.SEND_CREDENTIALS && <LoginForm authUser={authUser}/>}

          {step === LoginSteps.CHECK_CODE && <EmailConfirmation
            email={loginData.email}
            userRegSession={userAuthSession}
            checkCode={checkAuthCode}
            resendCode={resendAuthCode}
            setModalState={setModalState}/>}

        </AuthLayout>

        {/* {isLoading && <MiniPreloader/>}
            {loginStep === LoginSteps.SEND_CREDENTIALS && <LoginForm setLoginStep={setLoginStep} setPhone={setPhone} setConfirmations={setConfirmations}/>}
            {!isLoading && loginStep !== LoginSteps.SEND_CREDENTIALS && <CodeForm confirmations={confirmations} setLoginStep={setLoginStep} phone={phone}/>}*/}
      </LoginContext.Provider>
    </AuthContainer>
  );
}
