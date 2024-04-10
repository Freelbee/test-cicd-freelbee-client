'use client';

import { Button, Color, InfoWithIcon, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState} from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { useGetCountriesQuery } from "@freelancer/entities";
import { CountrySelect, ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { FormData } from "../interface/PersonalFormData";
import { AddressFormValidator } from "../util/CompanyDataValidator";
import { LanguageType } from "@freelbee/shared/language";

export const PaymentDataForm = () => {

    const {setStep, formData, setFormData} = useContext(OnboardingContext);
    const {data} = useGetCountriesQuery();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
    const validator = new AddressFormValidator();

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationResult = validator.validate(formData);
        setValidationResult(validationResult);

        // if(!validationResult.isSuccess()) {
        //     return;
        // }
        // To-Do
        setStep(Onboarding_Step.USER_DATA);
    }

  return (
    <Form onSubmit={submitHandler}>
        <CountrySelect 
            isError={validationResult.hasError('country')}
            countries={data ?? []} 
            selectedCountry={formData.country ?? null} 
            onSelect={(c) => setFormData(prev => ({...prev, country: c}))} />
        <Input 
            isRequired
            isError={validationResult.hasError('city')}
            errorMessage={validationResult.getMessageByLanguage('city', LanguageType.EN)}
            label="City"
            placeholder="Enter the city name" 
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            isError={validationResult.hasError('postalCode')}
            errorMessage={validationResult.getMessageByLanguage('postalCode', LanguageType.EN)}
            label="Postal code"
            placeholder="000 000" 
            value={""} 
            setValue={() => {}} />

        <Input 
            isRequired
            isError={validationResult.hasError('street')}
            errorMessage={validationResult.getMessageByLanguage('street', LanguageType.EN)}
            label="Street"
            placeholder="Enter the street name" 
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            isError={validationResult.hasError('houseNumber')}
            errorMessage={validationResult.getMessageByLanguage('houseNumber', LanguageType.EN)}
            maxLength={100}
            label="House number"
            placeholder="For example, 3" 
            value={""} 
            setValue={() => {}} />      

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