'use client';

import { Button, Input } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import { Country, CountrySelect } from "./CountrySelect";

export const AddressForm = () => {

    const {setStep} = useContext(OnboardingContext);
    const [countries, setCountries] = useState<Country[]>([]);
    const [country, setCountry] = useState<Country>();

    const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // To-Do

        setStep(Onboarding_Step.USER_DATA);
    }

  return (
    <Form onSubmit={submitHandler}>
        <CountrySelect 
            countries={countries} 
            selectedCountry={country} 
            onSelect={(c) => setCountry(c)} />
        <Input 
            isRequired
            label="City"
            placeholder="Enter the city name" 
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            label="Postal code"
            placeholder="000 000" 
            value={""} 
            setValue={() => {}} />

        <Input 
            isRequired
            label="Street"
            placeholder="Enter the street name" 
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            maxLength={100}
            label="For example, 3"
            placeholder="000 000" 
            value={""} 
            setValue={() => {}} />      

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