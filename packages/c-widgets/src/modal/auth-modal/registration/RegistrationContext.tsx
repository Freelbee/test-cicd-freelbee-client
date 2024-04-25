/* eslint-disable @typescript-eslint/no-empty-function */
import React, {Dispatch, SetStateAction} from 'react';
import {RegistrationData} from "@freelbee/entities";
import {RegistrationSteps} from "./RegistrationSteps";



export interface RegistrationContextType {
  registrationData: RegistrationData;
  setRegistrationData: Dispatch<SetStateAction<RegistrationData>>,
  step: RegistrationSteps,
  setStep: Dispatch<SetStateAction<RegistrationSteps>>
}

const RegistrationContext = React.createContext<RegistrationContextType>({
  registrationData: {
    email: '',
    password: '',
    phone: '',
    repeatPassword: '',
    agreeWithTerms: false
  },
  setRegistrationData: () => {
  },
  step: RegistrationSteps.FILL_USER_DATA,
  setStep: () => {
  }
});

export {RegistrationContext};
