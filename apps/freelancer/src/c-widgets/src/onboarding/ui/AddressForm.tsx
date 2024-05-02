'use client';

import { Button, Color, InfoWithIcon, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState} from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { CountrySelect, ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { FormData } from "../interface/FormData";
import { AddressFormValidator } from "../util/AddressFormValidator";
import { LanguageType } from "@freelbee/shared/language";
import { UserDataPropsType } from "@freelbee/entities";
import countries from "i18n-iso-countries";

export const AddressForm = () => {

    const {setStep, formData, setFormData} = useContext(OnboardingContext);
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const validator = new AddressFormValidator();

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationResult = validator.validate(formData);
        setValidationResult(validationResult);

        if(!validationResult.isSuccess()) {
            return;
        }
        setStep(Onboarding_Step.USER_DATA);
    }

  return (
    <Form onSubmit={submitHandler}>
        <CountrySelect 
            isError={validationResult.hasError(UserDataPropsType.COUNTRY)}
            defaultCountryCode="AE"
            onSelect={(c) => {
                setFormData(UserDataPropsType.COUNTRY, countries.getAlpha2Code(c, "en"));
            }} />
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.CITY)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.CITY, LanguageType.EN)}
            label="City"
            placeholder="Enter the city name" 
            value={formData?.CITY ?? ''} 
            setValue={(v) => setFormData(UserDataPropsType.CITY, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.POSTAL_CODE)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.POSTAL_CODE, LanguageType.EN)}
            label="Postal code"
            placeholder="Enter the code" 
            value={formData?.POSTAL_CODE ?? ''} 
            setValue={(v) => setFormData(UserDataPropsType.POSTAL_CODE, v)} />

        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.STREET)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.STREET, LanguageType.EN)}
            label="Street"
            placeholder="Enter the street name" 
            value={formData?.STREET ?? ''} 
            setValue={(v) => setFormData(UserDataPropsType.STREET, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.HOUSE_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.HOUSE_NUMBER, LanguageType.EN)}
            maxLength={100}
            label="House number"
            placeholder="For example, 3" 
            value={formData?.HOUSE_NUMBER ?? ''} 
            setValue={(v) => setFormData(UserDataPropsType.HOUSE_NUMBER, v)} />      

        <InfoWithIcon
            Icon={AlertIcon}
            textColor={Color.BLUE}
            align='flex-start'
            font='body'
        >
            Fill all fields with * to continue.
        </InfoWithIcon>

        <Button 
            type="submit" 
            isWide
            >Next</Button>
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;