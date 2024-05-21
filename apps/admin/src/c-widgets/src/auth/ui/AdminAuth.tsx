'use client';

import { useEffect, useState } from 'react';
import { AuthStep, SessionStatusType, useGetSessionDataQuery } from '@admin/entities';
import { AuthContext, Confirmation, Login, SignUp } from '@admin/features';
import { useRouter } from 'next/navigation';

export const AdminAuth = () => {
  const router = useRouter();
  const [step, setStep] = useState<AuthStep>();

  const { data: sessionData } = useGetSessionDataQuery();

  useEffect(() => {
    if (!sessionData) return;

    if (!sessionData.authStatus) {
      setStep(AuthStep.LOGIN);
      return;
    }
    switch (sessionData.authStatus) {
      case SessionStatusType.NEED_TO_CONNECT_TG:
        setStep(AuthStep.CONNECT_TELEGRAM);
        break;
      case SessionStatusType.CONFIRMATION_SENT:
      case SessionStatusType.NEED_TO_CONFIRM:
        setStep(AuthStep.CONFIRMATION);
        break;
      case SessionStatusType.CONFIRMED:
        router.push('/companies');
    }
  }, [sessionData]);

  return (
    <AuthContext.Provider value={{ step, setStep }}>
      {step === AuthStep.LOGIN && <Login />}
      {step === AuthStep.CONNECT_TELEGRAM && <SignUp />}
      {step === AuthStep.CONFIRMATION && <Confirmation />}
    </AuthContext.Provider>
  );
};
