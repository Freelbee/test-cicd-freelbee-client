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

import { AuthDto, RegistrationDto, SessionDto } from '@freelbee/entities';
import {useQueryParamsNavigation} from "@freelbee/shared/hooks";
import {useEffect, useState} from "react";

export const CompanyAuthModal = () => {
  const [searchParams] = useQueryParamsNavigation();
  const [modalState, setModalState] = useState(AuthModalState.Closed);

  const [registerUser] = useRegisterCompanyMutation();
  const [checkRegCode] = useSendCompanyRegConfirmationMutation();
  const [resendRegCode] = useResendCompanyRegistrationConfirmationMutation();
  const [authUser] = useSignInCompanyMutation();
  const [checkAuthCode] = useSendCompanyAuthConfirmationMutation();
  const [resendAuthCode] = useResendCompanyAuthConfirmationMutation();

  const [getCompanyRegSession] = useGetCompanyRegSessionMutation();
  const [getCompanyAuthSession] = useGetCompanyAuthSessionMutation();

  const userRegSession = async (): Promise<SessionDto> => {
    return getCompanyRegSession().unwrap().then((response) => {
      return response;
    });
  }

  const userAuthSession = async (): Promise<SessionDto> => {
    return getCompanyAuthSession().unwrap().then((response) => {
      return response;
    });
  }

  const onAuthUser = async (dto: AuthDto): Promise<void> => {
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
    if (searchParams.get('authState')?.includes('start')) {
      setModalState(AuthModalState.Register)
    } else {
      setModalState(AuthModalState.Login)
    }

  }, [searchParams]);

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
