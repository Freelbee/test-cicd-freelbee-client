'use client';

import { Button, Color, InfoWithIcon, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState} from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { CountrySelect, ValidatorResult } from "@freelbee/features";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { LanguageType } from "@freelbee/shared/language";
import { CompanyDataValidator } from "../util/CompanyDataValidator";
import { useCreateCompanyMutation, useGetCountriesQuery } from "@company/entities";
import { CompanyFormData } from "../interface/CompanyFormData";
import { CounterpartyDetailsPropsType, CounterpartyDetailsType, Country } from "@freelbee/entities";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { PropsHelper } from "@freelbee/shared/helpers";

const initialData: CompanyFormData = {
    [CounterpartyDetailsPropsType.NAME]: "",
    [CounterpartyDetailsPropsType.ADDRESS]: "",
    [CounterpartyDetailsPropsType.ZIP_CODE]: "",
    [CounterpartyDetailsPropsType.TAX_NUMBER]: "",
    [CounterpartyDetailsPropsType.TIN]: ""
}

export const CompanyDataForm = () => {

    const {setStep} = useContext(OnboardingContext);
    const {data: countries} = useGetCountriesQuery();
    const [createCompany, {isLoading}] = useCreateCompanyMutation();
    const [validationResult, setValidationResult] = useState(new ValidatorResult<CompanyFormData>());
    const validator = new CompanyDataValidator();
    const [country, setCountry] = useState<Country | null>(null);
    const [data, setData] = useDataStateUpdater<CompanyFormData>(initialData);

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const validationResult = validator.validate(data);
        setValidationResult(validationResult);
        if(!validationResult.isSuccess() || !country) {
            return;
        }

        const body = {
            counterpartyDetail: {
                country: country.alpha2Code,
                type: CounterpartyDetailsType.DEFAULT_COMPANY_DATA,
                props: PropsHelper.MapFieldsToProps(data) 
            }
        }
        
        createCompany(body).unwrap()
        .then(() => {
            setStep(Onboarding_Step.PAYMENT_DATA);
        })
        .catch(e => {})
    }

  return (
    <Form onSubmit={submitHandler}>
        <CountrySelect 
            isError={!country}
            countries={countries ?? []} 
            selectedCountry={country} 
            onSelect={(c) => {
                setCountry(c);
            }} />
        <Input 
            isRequired
            isError={validationResult.hasError(CounterpartyDetailsPropsType.NAME)}
            errorMessage={validationResult.getMessageByLanguage(CounterpartyDetailsPropsType.NAME, LanguageType.EN)}
            label="Company name"
            placeholder="Enter the company name" 
            value={data?.NAME ?? ''} 
            setValue={(v) => setData(CounterpartyDetailsPropsType.NAME, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(CounterpartyDetailsPropsType.TIN)}
            errorMessage={validationResult.getMessageByLanguage(CounterpartyDetailsPropsType.TIN, LanguageType.EN)}
            label="TIN"
            placeholder="Enter the TIN" 
            value={data?.TIN ?? ''} 
            setValue={(v) => setData(CounterpartyDetailsPropsType.TIN, v)} />

        <Input 
            isRequired
            isError={validationResult.hasError(CounterpartyDetailsPropsType.TAX_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(CounterpartyDetailsPropsType.TAX_NUMBER, LanguageType.EN)}
            label="Tax code"
            placeholder="Enter the code" 
            value={data?.TAX_NUMBER ?? ''} 
            setValue={(v) => setData(CounterpartyDetailsPropsType.TAX_NUMBER, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(CounterpartyDetailsPropsType.ADDRESS)}
            errorMessage={validationResult.getMessageByLanguage(CounterpartyDetailsPropsType.ADDRESS, LanguageType.EN)}
            label="Company adress"
            placeholder="Enter the street name" 
            value={data?.ADDRESS ?? ''} 
            setValue={(v) => setData(CounterpartyDetailsPropsType.ADDRESS, v)} />      
        <Input 
            isRequired
            isError={validationResult.hasError(CounterpartyDetailsPropsType.ZIP_CODE)}
            errorMessage={validationResult.getMessageByLanguage(CounterpartyDetailsPropsType.ZIP_CODE, LanguageType.EN)}
            label="Zip code"
            placeholder="Enter the code" 
            value={data?.ZIP_CODE ?? ''} 
            setValue={(v) => setData(CounterpartyDetailsPropsType.ZIP_CODE, v)} />      

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
            isLoading={isLoading}
            isWide
            >Next</Button>
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;