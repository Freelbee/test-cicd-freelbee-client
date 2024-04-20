import React, {useState} from 'react';

import AuthLayout from '../AuthLayout';
import {RegistrationSteps} from "./AuthSteps";
import AuthContainer from "../AuthContainer";
import {RegistrationContext} from "./RegistrationContext";
import {RegistrationData} from "../../../../../e-entities/src/auth/interface/RegistrationData";
import RegistrationForm from "./RegistrationForm";
import EmailConfirmation from "./EmailConfirmation";

type Props = {
    isOpen: boolean;
    registerUser: any;
    userRegSession: any;
    checkCode: any;
    resendCode: any;
};

export default function Registration (props: Props) {
    const { isOpen, registerUser, userRegSession, checkCode, resendCode } = props;

    const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.FillUserData);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        email: '',
        password: ``
    });


    const registrationSteps = [
        { step: RegistrationSteps.FillUserData, text: 'Register' },
        { step: RegistrationSteps.ConfirmEmail, text: 'Confirm your e-mail' },
    ];

    const data = {
        sidebarTitle: 'Sign Up',
        sidebarText: 'Already have an account?',
        sidebarLinkText: 'Log in',
    };

    return (
        <AuthContainer isOpen={isOpen}>
            <RegistrationContext.Provider value={{registrationData, setRegistrationData, step, setStep}}>
                <AuthLayout
                    context={RegistrationContext}
                    steps={registrationSteps}
                    data={data}
                    onClick={() => console.log('router.push(router.asPath.replace(\'sign-up\', \'sign-in\'));')}
                    /*onClick={() => {
                        router.push(router.asPath.replace('sign-up', 'sign-in'));
                        setAuthModalState(AuthModalState.Login);
                    }}*/
                >
                    {step === RegistrationSteps.FillUserData && <RegistrationForm registerUser={registerUser}/>}
                    {step === RegistrationSteps.ConfirmEmail && <EmailConfirmation
                      email={registrationData.email}
                      userRegSession={userRegSession}
                      checkCode={checkCode}
                      resendCode={resendCode}
                    />}
                </AuthLayout>
            </RegistrationContext.Provider>
        </AuthContainer>
    );
}
