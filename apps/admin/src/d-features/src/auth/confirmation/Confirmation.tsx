'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@admin/features';
import { usePaApiService } from '@admin/shared';
import { useDispatch } from 'react-redux';
import { AuthApiService, SessionStatusType } from '@admin/entities';
import { WaitForConfirmation } from './ui/WaitForConfirmation';
import { DeclinedConfirmation } from './ui/DeclinedConfirmation';
import { setSessionData } from '@admin/entities';

enum ConfirmationStep {
  Waiting,
  Declined
}

export function Confirmation() {
  const apiService = usePaApiService(AuthApiService);
  const session = useAppSelector((state) => state.sessionReducer);
  const dispatch = useDispatch();
  const [step, setStep] = useState<ConfirmationStep>(ConfirmationStep.Waiting);

  const sendConfirmation = async () => {
    apiService.sendConfirmation().then(response => {
      console.log('going to backend for confirmation endpoint');
      if (!response.isSuccess()) {
        //TODO error
        return;
      }
      dispatch(setSessionData({ authStatus: SessionStatusType.CONFIRMATION_SENT, adminUser: null }));
      setStep(ConfirmationStep.Waiting);
    });
  };

  useEffect(() => {
    if (session.data.status === SessionStatusType.NEED_TO_CONFIRM) {
      sendConfirmation();
    }
  }, []);

  return (
    <>
      {step === ConfirmationStep.Waiting && <WaitForConfirmation />}
      {step === ConfirmationStep.Declined && <DeclinedConfirmation sendConfirmation={sendConfirmation} />}
    </>
  );
}
