'use client';

import { CloseBtnSize, CloseButton, ModalWindow } from "@freelbee/shared/ui-kit";
import { BORDER_RADIUS, Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";
import { AddressForm } from "./ui/AddressForm";
import { useState } from "react";
import { PersonalForm } from "./ui/PersonalForm";
import { FirstStepTitle } from "./ui/FirstStepTitle";
import { SecondStepTitle } from "./ui/SecondStepTitle";
import { Onboarding_Step } from "./interface/OnboardingStep";
import { OnboardingContext } from "./context/OnboardingContext";
import { FormData } from "./interface/FormData";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { UserDataPropsType } from "@freelbee/entities";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@freelancer/features";
import { setOpened } from "@freelancer/entities";


const onboardingContent: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.ADDRESS]: <AddressForm />,
    [Onboarding_Step.USER_DATA]: <PersonalForm />
}

const onboardingTitle: Record<Onboarding_Step, JSX.Element> = {
    [Onboarding_Step.ADDRESS]: <FirstStepTitle />,
    [Onboarding_Step.USER_DATA]: <SecondStepTitle />
}

const initialData: FormData = {
    [UserDataPropsType.FIRST_NAME]: "",
    [UserDataPropsType.LAST_NAME]: "",
    [UserDataPropsType.PHONE_NUMBER]: "",
    [UserDataPropsType.BIRTH_DATE]: "",
    [UserDataPropsType.STREET]: "",
    [UserDataPropsType.COUNTRY]: "",
    [UserDataPropsType.CITY]: "",
    [UserDataPropsType.POSTAL_CODE]: "",
    [UserDataPropsType.HOUSE_NUMBER]: ""
}

export const OnboardingModal = () => {

    const [formData, setFormData] = useDataStateUpdater<FormData>(initialData);
    const [step, setStep] = useState<Onboarding_Step>(Onboarding_Step.ADDRESS);
    const dispatch = useDispatch();
    const isModalOpened = useAppSelector(state => state.onboardingReducer.onboardingOpened);

    const closeModal = () => {
        dispatch(setOpened(false))
    };
    return (
        <ModalWindow
            isOpen={isModalOpened}
            onClose={closeModal}>
                <OnboardingContext.Provider value={{
                    isModalOpened,
                    setOpened,
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