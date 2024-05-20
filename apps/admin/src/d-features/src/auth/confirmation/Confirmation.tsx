'use client';

import React, { useEffect, useState } from 'react';
import { SessionStatusType, useGetSessionDataQuery, useSendConfirmationMutation } from '@admin/entities';
import { WaitForConfirmation } from './ui/WaitForConfirmation';
import { DeclinedConfirmation } from './ui/DeclinedConfirmation';

enum ConfirmationStep {
  WAITING = 'WAITING',
  DECLINED = 'DECLINED',
}

export function Confirmation() {
  const [step, setStep] = useState<ConfirmationStep>(ConfirmationStep.WAITING);

  const { data: sessionData } = useGetSessionDataQuery();
  const [sendConfirmation] = useSendConfirmationMutation();

  const onSendConfirmation = () => {
    sendConfirmation()
      .then(() => setStep(ConfirmationStep.WAITING));
  };

  useEffect(() => {
    if (sessionData && sessionData.authStatus === SessionStatusType.NEED_TO_CONFIRM) {
      sendConfirmation();
    }
  });

  return (
    <>
      {step === ConfirmationStep.WAITING && <WaitForConfirmation />}
      {step === ConfirmationStep.DECLINED && <DeclinedConfirmation sendConfirmation={onSendConfirmation} />}
    </>
  );
}
