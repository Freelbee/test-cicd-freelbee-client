'use client';

import { createContext } from "react";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { FormData } from "../interface/FormData";
import { UserDataPropsType} from "@freelbee/entities";

export interface IOnboardingContext {
    isModalOpened: boolean,
    setOpened: (v: boolean) => void;
    step: Onboarding_Step,
    setStep: (step: Onboarding_Step) => void,
    formData: FormData,
    setFormData: (key: UserDataPropsType, value: unknown) => void;
}

export const OnboardingContext = createContext<IOnboardingContext>({
    step: Onboarding_Step.ADDRESS,
    setStep: () => { },
    formData: {
        [UserDataPropsType.FIRST_NAME]: "",
        [UserDataPropsType.LAST_NAME]: "",
        [UserDataPropsType.PHONE_NUMBER]: "",
        [UserDataPropsType.BIRTH_DATE]: "",
        [UserDataPropsType.STREET]: "",
        [UserDataPropsType.COUNTRY]: "",
        [UserDataPropsType.CITY]: "",
        [UserDataPropsType.POSTAL_CODE]: "",
        [UserDataPropsType.HOUSE_NUMBER]: ""
    },
    setFormData: () => { },
    isModalOpened: false,
    setOpened: () => {}
});