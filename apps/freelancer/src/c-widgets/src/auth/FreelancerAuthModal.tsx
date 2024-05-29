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
import { AuthenticationDto, RegistrationDto, UserAuthSessionDto } from '@freelbee/entities';
import { usePathname } from 'next/navigation';

export const FreelancerAuthModal = () => {

  const pathname = usePathname();
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


  const userRegSession = async (): Promise<UserAuthSessionDto> => {
    return getRegSession().unwrap().then((res) => {
      return res;
    });
  }

  const userAuthSession = async (): Promise<UserAuthSessionDto> => {
    return getAuthSession().unwrap().then((res) => {
      return res;
    });
  }

  useEffect(() => {
    const isSignUp = pathname.includes('sign-up')
    if (isSignUp) {
      setModalState(AuthModalState.Register)
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

  const onAuthUser = async (dto: AuthenticationDto) => {
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
