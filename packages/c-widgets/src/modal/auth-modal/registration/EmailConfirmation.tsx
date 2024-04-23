'use client'

import ConfirmationAuthLayout from "../ConfirmationAuthLayout";

type Props = {
  email: string;
  userRegSession: any;
  checkCode: any;
  resendCode: any;
  setModalState: any;
};

export default function EmailConfirmation (props: Props) {
  const { email, userRegSession, checkCode, resendCode, setModalState } = props;


  const getSessionState = (): Promise<number> => {
    if (!userRegSession) return Promise.resolve(100);
    return userRegSession().then((response) => {
      const now = new Date();
      const remainingDate = new Date(response.data.codeCanBeForwardedIn);
      return (remainingDate - now)/1000
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
