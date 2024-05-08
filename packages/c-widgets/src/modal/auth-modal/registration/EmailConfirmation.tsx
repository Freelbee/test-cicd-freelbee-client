'use client'

import ConfirmationAuthLayout from "../ConfirmationAuthLayout";
import {SessionDto} from "@freelbee/entities";
import {Dispatch, SetStateAction} from "react";
import {AuthModalState} from "@freelbee/widgets";

type Props = {
  email: string;
  userRegSession: () => Promise<SessionDto>;
  checkCode: (str: string) => Promise<void>;
  resendCode: () => Promise<void>;
  setModalState: Dispatch<SetStateAction<AuthModalState>>;
  onBack: () => void;
};

export default function EmailConfirmation (props: Props) {
  const { email, userRegSession, checkCode, resendCode, setModalState, onBack } = props;


  const getSessionState = (): Promise<number> => {
    if (!userRegSession) return Promise.resolve(100);
    return userRegSession().then((response) => {
      const now = new Date();
      const remainingDate = new Date(response.codeCanBeForwardedIn);
      return Math.round((remainingDate.valueOf() - now.valueOf())/1000);
    })
  }

    return (
        <ConfirmationAuthLayout
          remainingTime={getSessionState}
          buttonText={'Next'}
          description={`
                    A letter was sent to
                    ${email}
                    . To complete your registration, enter the code from email.
            `}
          sendCode={resendCode}
          checkCode={checkCode}
          setModalState={setModalState}
          onBack={onBack}
        />
    );
}
