'use client';

import { useEffect, useState } from 'react';
import { AuthStep, AuthStatus, useGetAuthInfoQuery } from '@admin/entities';
import { AuthContext, Confirmation, Login, SignUp } from '@admin/features';
import { useRouter } from 'next/navigation';

export const AdminAuthForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>();

  const { data: sessionData } = useGetAuthInfoQuery();

  useEffect(() => {
    if (!sessionData) return;

    if (!sessionData.authStatus) {
      setStep(AuthStep.LOGIN);
      return;
    }
    switch (sessionData.authStatus) {
      case AuthStatus.NEED_TO_CONNECT_TG:
        setStep(AuthStep.CONNECT_TELEGRAM);
        break;
      case AuthStatus.CONFIRMATION_SENT:
      case AuthStatus.NEED_TO_CONFIRM:
        setStep(AuthStep.CONFIRMATION);
        break;
      case AuthStatus.CONFIRMED:
        router.push('/companies');
    }
  }, [router, sessionData]);

  return (
    <AuthContext.Provider value={{ step, setStep }}>
      {step === AuthStep.LOGIN && <Login />}
      {step === AuthStep.CONNECT_TELEGRAM && <SignUp />}
      {step === AuthStep.CONFIRMATION && <Confirmation />}
    </AuthContext.Provider>
  );
};
