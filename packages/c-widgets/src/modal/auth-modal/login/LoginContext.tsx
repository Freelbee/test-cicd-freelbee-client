import React, {Dispatch, SetStateAction} from "react";
import {AuthenticationDto} from "@freelbee/entities";
import {LoginSteps} from "./LoginSteps";

export interface LoginContextType {
  loginData: AuthenticationDto;
  setLoginData: Dispatch<SetStateAction<AuthenticationDto>>;
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
