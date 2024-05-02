'use client';

import {AuthModal, AuthModalState} from "@freelbee/widgets";
import {
  useRegisterFreelancerMutation,
  useResendFreelancerAuthConfirmationMutation,
  useResendFreelancerConfirmationMutation,
  useSendFreelancerAuthConfirmationMutation,
  useSendFreelancerRegConfirmationMutation,
  useSignInFreelancerMutation,
  useGetFreelancerRegSessionMutation,
  useGetFreelancerAuthSessionMutation,
} from "@freelancer/entities";
import {useEffect, useState} from "react";
import {useQueryParamsNavigation} from "@freelbee/shared/hooks";
import { AuthDto, RegistrationDto, SessionDto } from '@freelbee/entities';

export const FreelancerAuthModal = () => {
  const [searchParams] = useQueryParamsNavigation();
  const [modalState, setModalState] = useState(AuthModalState.Closed);

  const [registerUser] = useRegisterFreelancerMutation();
  const [checkCode] = useSendFreelancerRegConfirmationMutation();
  const [resendCode] = useResendFreelancerConfirmationMutation();

  const [authUser] = useSignInFreelancerMutation();
  const [checkAuthCode] = useSendFreelancerAuthConfirmationMutation();
  const [resendAuthCode] = useResendFreelancerAuthConfirmationMutation();

  const [getRegSession] = useGetFreelancerRegSessionMutation();
  const [getAuthSession] = useGetFreelancerAuthSessionMutation();


  const userRegSession = async (): Promise<SessionDto> => {
    return getRegSession().unwrap().then((res) => {
      return res;
    });
  }

  const userAuthSession = async (): Promise<SessionDto> => {
    return getAuthSession().unwrap().then((res) => {
      return res;
    });
  }

  useEffect(() => {
    if (searchParams.get('authState')?.includes('start')) {
      setModalState(AuthModalState.Register)
    } else if (localStorage.getItem('ACCESS_TOKEN') != null) {
      setModalState(AuthModalState.Closed)
    } else {
      setModalState(AuthModalState.Login)
    }

  }, [searchParams]);


  const onCheckAuthCode = async (code: string) => {
    return checkAuthCode(code).unwrap();
  }
  const onResendAuthCode = async () => {
    return resendAuthCode().unwrap();
  }

  const onAuthUser = async (dto: AuthDto) => {
    return authUser(dto).unwrap();
  }

  const onCheckRegCode = async (code: string) => {
    return checkCode(code).unwrap();
  }

  const onResendRegCode = async () => {
    return resendCode().unwrap();
  }

  const onRegisterUser = async (dto: RegistrationDto) => {
    return registerUser(dto).unwrap();
  }

  return (
    <AuthModal
      authModalState={modalState}
      setAuthModalState={setModalState}
      registerUser={onRegisterUser}
      userRegSession={userRegSession}
      checkCode={onCheckRegCode}
      resendCode={onResendRegCode}

      authUser={onAuthUser}
      checkAuthCode={onCheckAuthCode}
      resendAuthCode={onResendAuthCode}
      userAuthSession={userAuthSession}
      />
  )
}
