'use client';

import {AuthModal, AuthModalState} from "@freelbee/widgets";
import {
  authApi,
  useRegisterFreelancerMutation,
  useResendFreelancerAuthConfirmationMutation,
  useResendFreelancerConfirmationMutation,
  useSendFreelancerAuthConfirmationMutation,
  useSendFreelancerRegConfirmationMutation,
  useSignInFreelancerMutation
} from "@freelancer/entities";
import {useDispatch} from "react-redux";
import {SessionDto} from "@freelbee/entities";
import {useEffect, useState} from "react";
import {useQueryParamsNavigation} from "@freelbee/shared/hooks";

export const FreelancerAuthModal = () => {
  const [searchParams] = useQueryParamsNavigation();
  const [modalState, setModalState] = useState(AuthModalState.Closed);

  const [registerUser] = useRegisterFreelancerMutation();
  const [checkCode] = useSendFreelancerRegConfirmationMutation();
  const [resendCode] = useResendFreelancerConfirmationMutation();

  const [authUser] = useSignInFreelancerMutation();
  const [checkAuthCode] = useSendFreelancerAuthConfirmationMutation();
  const [resendAuthCode] = useResendFreelancerAuthConfirmationMutation();

  const dispatch = useDispatch<any>();

  const userRegSession = async (): Promise<SessionDto> => {
    return dispatch(authApi.endpoints.getFreelancerRegSession.initiate({timestamp: Date.now()}));
  }

  const userAuthSession = async (): Promise<SessionDto> => {
    return await dispatch(authApi.endpoints.getFreelancerAuthSession.initiate({timestamp: Date.now()}));
  }

  useEffect(() => {
    if (searchParams.get('authState')?.includes('start')) {
      setModalState(AuthModalState.Register)
    } else if (localStorage.getItem('ACCESS_TOKEN') != null) {
      setModalState(AuthModalState.Closed)
    } else {
      setModalState(AuthModalState.Login)
    }

  }, [searchParams, localStorage]);


  return (
    <AuthModal
      authModalState={modalState}
      setAuthModalState={setModalState}
      registerUser={registerUser}
      userRegSession={userRegSession}
      checkCode={checkCode}
      resendCode={resendCode}

      authUser={authUser}
      checkAuthCode={checkAuthCode}
      resendAuthCode={resendAuthCode}
      userAuthSession={userAuthSession}
      />
  )
}
