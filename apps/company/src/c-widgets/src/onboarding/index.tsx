'use client';

import { CloseBtnSize, CloseButton, ModalWindow } from "@freelbee/shared/ui-kit";
import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";
import { useState } from "react";
import { PersonalForm } from "./ui/PersonalForm";
import { Onboarding_Step } from "./interface/OnboardingStep";
import { OnboardingContext } from "./context/OnboardingContext";
import { CompanyDataForm } from "./ui/CompanyDataForm";
import { PaymentDataForm } from "./ui/PaymentDataForm";
import { FirstStepTitle } from "./ui/FirstStepTitle";
import { SecondStepTitle } from "./ui/SecondStepTitle";
import { ThirdStepTitle } from "./ui/ThirdStepTitle";


const onboardingContent: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.USER_DATA]: <PersonalForm />,
    [Onboarding_Step.COMPANY_DATA]: <CompanyDataForm />,
    [Onboarding_Step.PAYMENT_DATA]: <PaymentDataForm />,
}

const onboardingTitle: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.USER_DATA]: <FirstStepTitle />,
    [Onboarding_Step.COMPANY_DATA]: <SecondStepTitle />,
    [Onboarding_Step.PAYMENT_DATA]: <ThirdStepTitle />
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
      
    const [step, setStep] = useState<Onboarding_Step>(Onboarding_Step.USER_DATA);
    const [open, setOpen] = useState<boolean>(true);
    const closeModal = () => setOpen(false);

    console.log(step)

    return (
        <ModalWindow
            isOpen={open}
            onClose={closeModal}>
                <OnboardingContext.Provider value={{
                    open,
                    setOpen,
                    step,
                    setStep
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
    max-width: 580px;
    min-width: 540px;
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
        min-width: 300px;
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