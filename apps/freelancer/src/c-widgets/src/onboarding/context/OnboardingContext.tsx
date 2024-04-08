'use client';

import { createContext } from "react";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { FormData } from "../interface/FormData";

export interface IOnboardingContext {
    open: boolean,
    setOpen: (v: boolean) => void;
    step: Onboarding_Step,
    setStep: (step: Onboarding_Step) => void,
    formData: FormData,
    setFormData: (data: FormData) => void;
}

export const OnboardingContext = createContext<IOnboardingContext>({
    step: Onboarding_Step.ADDRESS,
    setStep: () => { },
    formData: {
        name: "",
        surname: "",
        phone: "",
        country: "",
        city: "",
        postalCode: ""
    },
    setFormData: () => { },
    open: false,
    setOpen: () => {}
});