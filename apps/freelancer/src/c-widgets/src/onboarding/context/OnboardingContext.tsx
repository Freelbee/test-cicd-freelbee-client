'use client';

import { Dispatch, SetStateAction, createContext } from "react";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { FormData } from "../interface/FormData";

export interface IOnboardingContext {
    open: boolean,
    setOpen: (v: boolean) => void;
    step: Onboarding_Step,
    setStep: (step: Onboarding_Step) => void,
    formData: FormData,
    setFormData: Dispatch<SetStateAction<FormData>>;
}

export const OnboardingContext = createContext<IOnboardingContext>({
    step: Onboarding_Step.ADDRESS,
    setStep: () => { },
    formData: {
        name: "",
        surname: "",
        dateOfBirth: "",
        phone: "",
        country: null,
        city: "",
        postalCode: "",
        street: "",
        houseNumber: ""
    },
    setFormData: () => { },
    open: false,
    setOpen: () => {}
});