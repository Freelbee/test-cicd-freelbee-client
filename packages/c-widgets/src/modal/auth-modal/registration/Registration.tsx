'use client'
import React, {Dispatch, SetStateAction, useState} from 'react';

import AuthContainer from "../AuthContainer";
import {RegistrationContext} from "./RegistrationContext";
import RegistrationForm from "./RegistrationForm";
import EmailConfirmation from "./EmailConfirmation";
import {AuthModalState} from "@freelbee/widgets";
import { RegistrationData, SessionDto} from "@freelbee/entities";
import RegistrationLayout from "./RegistrationLayout";
import {RegistrationSteps} from "./RegistrationSteps";
import {RegistrationDto} from "../../../../../e-entities/src/auth/dto/RegistrationDto";

type Props = {
    isOpen: boolean;
    registerUser: (dto: RegistrationDto) => void;
    userRegSession: () => Promise<SessionDto>;
    checkCode: (code: string) => void;
    resendCode: () => void;
    setModalState: Dispatch<SetStateAction<AuthModalState>>;
};

export default function Registration (props: Props) {
    const { isOpen, registerUser, userRegSession, checkCode, resendCode, setModalState } = props;
    const [step, setStep] = useState<RegistrationSteps>(RegistrationSteps.FILL_USER_DATA);
    const [registrationData, setRegistrationData] = useState<RegistrationData>({
        email: '',
        password: '',
        phone: '',
        repeatPassword: '',
        agreeWithTerms: false
    });


    const registrationSteps = [
        { step: RegistrationSteps.FILL_USER_DATA, text: 'Register' },
        { step: RegistrationSteps.CONFIRM_EMAIL, text: 'Confirm your e-mail' },
    ];

    const data = {
        sidebarTitle: 'Sign Up',
        sidebarText: 'Already have an account?',
        sidebarLinkText: 'Log in',
    };

    return (
        <AuthContainer isOpen={isOpen}>
            <RegistrationContext.Provider value={{registrationData, setRegistrationData, step, setStep}}>
                <RegistrationLayout
                    propsStep={{step, setStep}}
                    steps={registrationSteps}
                    data={data}
                    onClick={() => setModalState(AuthModalState.Login)}
                    /*onClick={() => {
                        router.push(router.asPath.replace('sign-up', 'sign-in'));
                        setAuthModalState(AuthModalState.Login);
                    }}*/
                >
                    {step === RegistrationSteps.FILL_USER_DATA && <RegistrationForm registerUser={registerUser}/>}
                    {step === RegistrationSteps.CONFIRM_EMAIL && <EmailConfirmation
                      email={registrationData.email}
                      userRegSession={userRegSession}
                      checkCode={checkCode}
                      resendCode={resendCode}
                      setModalState={setModalState}
                    />}
                </RegistrationLayout>
            </RegistrationContext.Provider>
        </AuthContainer>
    );
}
