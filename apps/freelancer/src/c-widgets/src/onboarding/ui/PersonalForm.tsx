'use client';

import { Button, DateInput, Input, PhoneNumberInput } from "@freelbee/shared/ui-kit";
import { ButtonStyleEnum } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";

export const PersonalForm = () => {
  
  const {setStep} = useContext(OnboardingContext);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      // To-Do
  }

  return (
    <Form onSubmit={submitHandler}>
        <Input 
            isRequired
            label="Name"
            placeholder={"John"} 
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            label="Surname"
            placeholder="Silver" 
            value={""} 
            setValue={() => {}} />
        <PhoneNumberInput 
            isRequired
            label="Phone"
            value={""} 
            setValue={() => {}} />
        <DateInput 
          isRequired
          label="Date of birth"
          value={""} 
          setValue={() => {}} />

        <ButtonsContainer>
          <Button 
            isWide 
            type='submit'>Submit</Button>  
          <Button 
            onClick={() => setStep(Onboarding_Step.ADDRESS)}
            styleType={ButtonStyleEnum.GREEN} 
            isWide>Back</Button>  
        </ButtonsContainer>
        
    </Form>
  )
}

const Form = styled.form`
    display: grid;
    gap: 16px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;
`;