/* eslint-disable @typescript-eslint/no-empty-function */
import React, {Dispatch, SetStateAction} from 'react';
import {RegistrationData} from "@freelbee/entities";
import {RegistrationSteps} from "./AuthSteps";


export interface RegistrationContextType {
  registrationData: RegistrationData;
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>,
  step: RegistrationSteps,
  setStep: Dispatch<SetStateAction<RegistrationSteps>>
}

const RegistrationContext = React.createContext<RegistrationContextType>({
  registrationData: {
    email: '',
    password: ``,
    repeatPassword: ``,
    agreeWithTerms: false
  },
  setRegistrationData: () => {
  },
  step: RegistrationSteps.FillUserData,
  setStep: () => {
  }
});

export {RegistrationContext};
