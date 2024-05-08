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
import {RegistrationDto} from '@freelbee/entities';

type Props = {
    isOpen: boolean;
    registerUser: (dto: RegistrationDto) => Promise<void>;
    userRegSession: () => Promise<SessionDto>;
    checkCode: (code: string) => Promise<void>;
    resendCode: () => Promise<void>;
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
                    steps={registrationSteps}
                    data={data}
                    onClick={() => setModalState(AuthModalState.Login)}

                >
                    {step === RegistrationSteps.FILL_USER_DATA && <RegistrationForm registerUser={registerUser}/>}
                    {step === RegistrationSteps.CONFIRM_EMAIL && <EmailConfirmation
                      email={registrationData.email}
                      userRegSession={userRegSession}
                      checkCode={checkCode}
                      resendCode={resendCode}
                      setModalState={setModalState}
                      onBack={() => setStep(RegistrationSteps.FILL_USER_DATA)}
                    />}
                </RegistrationLayout>
            </RegistrationContext.Provider>
        </AuthContainer>
    );
}
