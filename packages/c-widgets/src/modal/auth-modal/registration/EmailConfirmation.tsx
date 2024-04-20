import {useState} from 'react';
import ConfirmationAuthLayout from "../ConfirmationAuthLayout";

type Props = {
  email: string;
  userRegSession: any;
  checkCode: any;
  resendCode: any;
};

export default function EmailConfirmation (props: Props) {
  const { email, userRegSession, checkCode, resendCode } = props;
    const [sendLoading, setSetLoading] = useState(true);


  const getSessionState = (): Promise<{needSend: boolean, resendRemain: number}> => {
    if (!userRegSession) return Promise.resolve({needSend: false, resendRemain: 100});
    return userRegSession().then((response) => {
      const now = new Date();
      const remainingDate = new Date(response.codeCanBeForwardedIn);
      return {needSend: false, resendRemain: (remainingDate - now)/1000}
    })
  }

    return (
        <ConfirmationAuthLayout
            getSessionState={getSessionState}
            buttonText={'Next'}
            description={`
                    A letter was sent to
                    ${email}
                    . To complete your registration, enter the code from email.
            `}
            sendCode={resendCode}
            sendLoading={sendLoading}
            checkCode={checkCode}
        />
    );
}
