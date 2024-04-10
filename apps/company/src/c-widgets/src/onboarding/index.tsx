'use client';

import { CloseBtnSize, CloseButton, ModalWindow } from "@freelbee/shared/ui-kit";
import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";
import { AddressForm } from "./ui/CompanyDataForm";
import { useState } from "react";
import { PersonalForm } from "./ui/PersonalForm";
import { FirstStepTitle } from "./ui/SecondStepTitle";
import { SecondStepTitle } from "./ui/FirstStepTitle";
import { Onboarding_Step } from "./interface/OnboardingStep";
import { OnboardingContext } from "./context/OnboardingContext";
import { FormData } from "./interface/PersonalFormData";


const onboardingContent: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.ADDRESS]: <AddressForm />,
    [Onboarding_Step.USER_DATA]: <PersonalForm />
}

const onboardingTitle: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.ADDRESS]: <FirstStepTitle />,
    [Onboarding_Step.USER_DATA]: <SecondStepTitle />
}

export const OnboardingModal = () => {

    // To-Do
    const user = {
        id: 1,
        firstname: 'Testov',
        lastname: 'Test',
        email: 'test@mail.com',
        phone: '+79784556633',
        status: '',
        }
      

    const [formData, setFormData] = useState<FormData>({
        name: "",
        surname: "",
        phone: "",
        dateOfBirth: "",
        country: null,
        city: "",
        postalCode: "",
        street: "",
        houseNumber: ""
    });
    const [step, setStep] = useState<Onboarding_Step>(Onboarding_Step.ADDRESS);
    const [open, setOpen] = useState<boolean>(() => user.status != 'approved');
    const closeModal = () => setOpen(false);

    return (
        <ModalWindow
            isOpen={open}
            onClose={closeModal}>
                <OnboardingContext.Provider value={{
                    open,
                    setOpen,
                    step,
                    setStep,
                    formData,
                    setFormData
                }}>
                    <Container>
                        <Header>
                            {onboardingTitle[step]}
                            <CloseButton 
                                size={CloseBtnSize.L}
                                styles={closeBtnStyle}
                                clickHandler={closeModal} />
                            </Header>
                        
                        {onboardingContent[step]}
                    </Container>
                </OnboardingContext.Provider>

        </ModalWindow>
    );
};

const Container = styled.div`
    position: relative;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;
    border-radius: ${BORDER_RADIUS.L};
    background-color: ${Color.WHITE};

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
        gap: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding: 16px;
        width: 100%;
        max-width: 400px;
    }
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const closeBtnStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;  
`;