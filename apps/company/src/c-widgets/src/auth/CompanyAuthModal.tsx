'use client';

import {AuthModal, AuthModalState} from "@freelbee/widgets";
import {
  useRegisterCompanyMutation,
  useResendCompanyAuthConfirmationMutation,
  useResendCompanyRegistrationConfirmationMutation,
  useSendCompanyAuthConfirmationMutation,
  useSendCompanyRegConfirmationMutation,
  useSignInCompanyMutation,
  useGetCompanyRegSessionMutation,
  useGetCompanyAuthSessionMutation
} from "@company/entities";

import { AuthenticationDto, RegistrationDto, UserAuthSessionDto } from '@freelbee/entities';
import {useEffect, useState} from "react";
import { usePathname } from 'next/navigation';

export const CompanyAuthModal = () => {

  const pathname = usePathname();

  const [modalState, setModalState] = useState(AuthModalState.Closed);

  const [registerUser] = useRegisterCompanyMutation();
  const [checkRegCode] = useSendCompanyRegConfirmationMutation();
  const [resendRegCode] = useResendCompanyRegistrationConfirmationMutation();
  const [authUser] = useSignInCompanyMutation();
  const [checkAuthCode] = useSendCompanyAuthConfirmationMutation();
  const [resendAuthCode] = useResendCompanyAuthConfirmationMutation();

  const [getCompanyRegSession] = useGetCompanyRegSessionMutation();
  const [getCompanyAuthSession] = useGetCompanyAuthSessionMutation();

  const userRegSession = async (): Promise<UserAuthSessionDto> => {
    return getCompanyRegSession().unwrap().then((response) => {
      return response;
    });
  }

  const userAuthSession = async (): Promise<UserAuthSessionDto> => {
    return getCompanyAuthSession().unwrap().then((response) => {
      return response;
    });
  }

  const onAuthUser = async (dto: AuthenticationDto): Promise<void> => {
    return authUser(dto).unwrap();
  }

  const onCheckAuthCode = async (str: string): Promise<void> => {
    return checkAuthCode(str).unwrap();
  }
  const onCheckRegCode = async (str: string): Promise<void> => {
    return checkRegCode(str).unwrap();
  }
  const onSendAuthCode = async (): Promise<void> => {
    return resendAuthCode().unwrap();
  }
  const onSendRegCode = async (): Promise<void> => {
    return resendRegCode().unwrap();
  }

  const onRegisterUser = async (dto: RegistrationDto): Promise<void> => {
    return registerUser(dto).unwrap();
  }

  useEffect(() => {
    const isSignUp = pathname.includes('sign-up')
    if (isSignUp) {
      setModalState(AuthModalState.Register)
    } else {
      setModalState(AuthModalState.Login)
    }
  }, []);

  return (
    <AuthModal
      authModalState={modalState}
      setAuthModalState={setModalState}

      registerUser={onRegisterUser}
      userRegSession={userRegSession}

      checkCode={onCheckRegCode}
      resendCode={onSendRegCode}

      authUser={onAuthUser}
      checkAuthCode={onCheckAuthCode}
      resendAuthCode={onSendAuthCode}
      userAuthSession={userAuthSession}
    />
  )
}
