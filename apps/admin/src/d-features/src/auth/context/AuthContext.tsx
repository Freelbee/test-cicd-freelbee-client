import React, { Dispatch, SetStateAction } from 'react';
import { AuthStep } from '@admin/entities';

export interface AuthContextType {
  step: AuthStep,
  setStep: Dispatch<SetStateAction<AuthStep>>
}

const AuthContext = React.createContext({});

export { AuthContext };
