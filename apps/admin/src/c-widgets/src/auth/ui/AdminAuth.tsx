'use client';

import { useEffect, useState } from 'react';
import { AuthStep, SessionStatusType } from '@admin/entities';
import { AuthContext, Confirmation, Login, SignUp, useAppSelector } from '@admin/features';
import { useRouter } from 'next/navigation';

export const AdminAuth = () => {
  const router = useRouter();
  const session = useAppSelector(state => state.sessionReducer);
  const [step, setStep] = useState<AuthStep>();

  useEffect(() => {
    if (!session.data.status) {
      setStep(AuthStep.Login);
      return;
    }
    switch (session?.data?.status) {
      case SessionStatusType.NEED_TO_CONNECT_TG:
        setStep(AuthStep.ConnectTelegram);
        break;
      case SessionStatusType.CONFIRMATION_SENT:
      case SessionStatusType.NEED_TO_CONFIRM:
        setStep(AuthStep.Confirmation);
        break;
      case SessionStatusType.CONFIRMED:
        router.push('/companies'); //TODO::: change to const
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ step, setStep }}>
      {step === AuthStep.Login && <Login />}
      {step === AuthStep.ConnectTelegram && <SignUp />}
      {step === AuthStep.Confirmation && <Confirmation />}
    </AuthContext.Provider>
  );
};
