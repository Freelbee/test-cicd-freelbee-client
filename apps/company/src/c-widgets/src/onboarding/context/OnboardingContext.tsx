'use client';

import { Dispatch, SetStateAction, createContext } from "react";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { PersonalFormData } from "../interface/PersonalFormData";
import { UserDataPropsType } from "@freelbee/entities";

export interface IOnboardingContext {
    open: boolean,
    setOpen: (v: boolean) => void;
    step: Onboarding_Step,
    setStep: (step: Onboarding_Step) => void,
    userData: PersonalFormData,
    setUserData: Dispatch<SetStateAction<PersonalFormData>>;
}

export const OnboardingContext = createContext<IOnboardingContext>({
    step: Onboarding_Step.USER_DATA,
    setStep: () => { },
    open: false,
    setOpen: () => {},
    userData: {
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
    setUserData: () => { },
});