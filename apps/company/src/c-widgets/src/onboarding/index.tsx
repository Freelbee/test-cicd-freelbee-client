'use client';

import { CloseBtnSize, CloseButton, ModalWindow } from "@freelbee/shared/ui-kit";
import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { PersonalForm } from "./ui/PersonalForm";
import { Onboarding_Step } from "./interface/OnboardingStep";
import { OnboardingContext } from "./context/OnboardingContext";
import { CompanyDataForm } from "./ui/CompanyDataForm";
import { PaymentDataForm } from "./ui/PaymentDataForm";
import { FirstStepTitle } from "./ui/FirstStepTitle";
import { SecondStepTitle } from "./ui/SecondStepTitle";
import { ThirdStepTitle } from "./ui/ThirdStepTitle";
import { setOnboardingOpened, useGetCompanyOnboardingStateQuery, useGetCompanyQuery } from "@company/entities";
import Spinner from "packages/f-shared/src/ui-kit/spinner/Spinner";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@company/features";

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

    const {data: onboardingState, isLoading} = useGetCompanyOnboardingStateQuery();
    // To-do: query
    const {data: company} = useGetCompanyQuery();
    const [step, setStep] = useState<Onboarding_Step>(Onboarding_Step.USER_DATA);
    const dispatch = useDispatch();
    const isModalOpened = useAppSelector(state => state.onboardingReducer.onboardingOpened);

    const closeModal = () => {
        dispatch(setOnboardingOpened(false))
    };

    useEffect(() => {
        if(onboardingState?.isUserDataSet && !onboardingState.isCounterpartyCreated) {
            setStep(Onboarding_Step.COMPANY_DATA)
        }
        if(onboardingState?.isUserDataSet 
            && onboardingState.isCounterpartyCreated
            && !onboardingState.isPaymentMethodSet) {
            setStep(Onboarding_Step.PAYMENT_DATA)
        }
    }, [onboardingState, company, dispatch])

    return (
        <ModalWindow
            isOpen={isModalOpened}
            onClose={closeModal}>
                <OnboardingContext.Provider value={{
                    isModalOpened,
                    setOpened: setOnboardingOpened,
                    step,
                    setStep
                }}>
                    {isLoading ? 
                    <Container><Spinner loading={isLoading} size={50} /></Container>
                    :
                     <Container>
                        <Header>
                            {onboardingTitle[step]}
                            <CloseButton 
                                size={CloseBtnSize.L}
                                styles={closeBtnStyle}
                                clickHandler={closeModal} />
                        </Header>  
                        {onboardingContent[step]}
                    </Container>}
                   
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