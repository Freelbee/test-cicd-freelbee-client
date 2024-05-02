'use client';

import { createContext } from "react";
import { Onboarding_Step } from "../interface/OnboardingStep";

export interface IOnboardingContext {
    isModalOpened: boolean,
    setOpened: (v: boolean) => void;
    step: Onboarding_Step,
    setStep: (step: Onboarding_Step) => void,
}

export const OnboardingContext = createContext<IOnboardingContext>({
    step: Onboarding_Step.USER_DATA,
    setStep: () => { },
    isModalOpened: false,
    setOpened: () => {}
});