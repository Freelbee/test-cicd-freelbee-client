'use client';

import React, { useEffect, useState } from 'react';
import { AuthStatus, useGetAuthInfoQuery, useSendConfirmationMutation } from '@admin/entities';
import { WaitForConfirmation } from './ui/WaitForConfirmation';
import { DeclinedConfirmation } from './ui/DeclinedConfirmation';

enum ConfirmationStep {
  WAITING = 'WAITING',
  DECLINED = 'DECLINED',
}

export function Confirmation() {
  const [step, setStep] = useState<ConfirmationStep>(ConfirmationStep.WAITING);
  let workaroundCounter = 0; //TODO::: find out why 2 requests are being sent, and remove this workaround

  const { data: sessionData } = useGetAuthInfoQuery();
  const [sendConfirmation] = useSendConfirmationMutation();

  const onSendConfirmation = () => {
    sendConfirmation()
      .then(() => setStep(ConfirmationStep.WAITING));
  };

  useEffect(() => {
    if (sessionData && sessionData.authStatus === AuthStatus.NEED_TO_CONFIRM) {
      if (workaroundCounter === 0) {
        sendConfirmation();
        workaroundCounter += 1;
      }
    }
  });

  return (
    <>
      {step === ConfirmationStep.WAITING && <WaitForConfirmation />}
      {step === ConfirmationStep.DECLINED && <DeclinedConfirmation sendConfirmation={onSendConfirmation} />}
    </>
  );
}
