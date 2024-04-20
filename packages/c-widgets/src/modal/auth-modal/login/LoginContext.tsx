import {AuthDto} from "../../../../../e-entities/src/auth/dto/AuthDto";
import React, {Dispatch, SetStateAction} from "react";
import {LoginSteps} from "../registration/AuthSteps";

export interface LoginContextType {
  loginData: AuthDto;
  setLoginData: Dispatch<SetStateAction<AuthDto>>;
  step: LoginSteps;
  setStep: Dispatch<SetStateAction<LoginSteps>>;
}

const LoginContext = React.createContext<LoginContextType>({
  loginData: {
    email: '',
    password: ''
  },
  setLoginData: () => {},
  step: LoginSteps.SEND_CREDENTIALS,
  setStep: () => {}
});

export {LoginContext};
