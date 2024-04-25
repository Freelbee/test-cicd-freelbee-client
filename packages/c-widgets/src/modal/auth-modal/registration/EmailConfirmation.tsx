'use client'

import ConfirmationAuthLayout from "../ConfirmationAuthLayout";
import {SessionDto} from "@freelbee/entities";
import {Dispatch, SetStateAction} from "react";
import {AuthModalState} from "@freelbee/widgets";

type Props = {
  email: string;
  userRegSession: () => Promise<SessionDto>;
  checkCode: (string) => void;
  resendCode: () => void;
  setModalState: Dispatch<SetStateAction<AuthModalState>>;
};

export default function EmailConfirmation (props: Props) {
  const { email, userRegSession, checkCode, resendCode, setModalState } = props;


  const getSessionState = (): Promise<number> => {
    if (!userRegSession) return Promise.resolve(100);
    return userRegSession().then((response) => {
      const now = new Date();
      const remainingDate = new Date(response.data.codeCanBeForwardedIn);
      return (remainingDate.valueOf() - now.valueOf())/1000;
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
        />
    );
}
