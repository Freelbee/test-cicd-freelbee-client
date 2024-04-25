'use client';

import {AuthModal, AuthModalState} from "@freelbee/widgets";
import {
  authApi,
  useRegisterCompanyMutation,
  useResendCompanyAuthConfirmationMutation,
  useResendCompanyConfirmationMutation,
  useSendCompanyAuthConfirmationMutation,
  useSendCompanyRegConfirmationMutation,
  useSignInCompanyMutation
} from "@company/entities";
import {useDispatch} from "react-redux";
import {SessionDto} from "@freelbee/entities";
import {useQueryParamsNavigation} from "@freelbee/shared/hooks";
import {useEffect, useState} from "react";

export const CompanyAuthModal = () => {
  const [searchParams] = useQueryParamsNavigation();
  const [modalState, setModalState] = useState(AuthModalState.Closed);

  const [registerUser] = useRegisterCompanyMutation();
  const [checkCode] = useSendCompanyRegConfirmationMutation();
  const [resendCode] = useResendCompanyConfirmationMutation();
  const [authUser] = useSignInCompanyMutation();
  const [checkAuthCode] = useSendCompanyAuthConfirmationMutation();
  const [resendAuthCode] = useResendCompanyAuthConfirmationMutation();

  const dispatch = useDispatch();

  const userRegSession = async (): Promise<SessionDto> => {
    return dispatch(authApi.endpoints.getCompanyRegSession.initiate({timestamp: Date.now()}));
  }

  const userAuthSession = async (): Promise<SessionDto> => {
    return dispatch(authApi.endpoints.getCompanyAuthSession.initiate({timestamp: Date.now()}));
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
