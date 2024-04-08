'use client';

import { Button, Color, DateInput, InfoWithIcon, Input, PhoneNumberInput } from "@freelbee/shared/ui-kit";
import { ButtonStyleEnum } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { ValidatorResult } from "@freelbee/features";
import { FormData } from "../interface/FormData";
import { PersonalFormValidator } from "../util/PersonalFormValidator";
import { LanguageType } from "@freelbee/shared/language";

export const PersonalForm = () => {
  
  const {setStep, formData} = useContext(OnboardingContext);
  const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
  const validator = new PersonalFormValidator();


  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      // To-Do

      const validationResult = validator.validate(formData);
      setValidationResult(validationResult);

      if(!validationResult.isSuccess()) {
          return;
      }
  }

  return (
    <Form onSubmit={submitHandler}>
        <Input 
            isRequired
            isError={validationResult.hasError('name')}
            errorMessage={validationResult.getMessageByLanguage('name', LanguageType.EN)}
            label="Name"
            placeholder={"John"} 
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={""} 
            setValue={() => {}} />
        <Input 
            isRequired
            isError={validationResult.hasError('surname')}
            errorMessage={validationResult.getMessageByLanguage('surname', LanguageType.EN)}
            label="Surname"
            placeholder="Silver" 
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={""} 
            setValue={() => {}} />
        <PhoneNumberInput 
            isRequired
            isError={validationResult.hasError('phone')}
            errorMessage={validationResult.getMessageByLanguage('phone', LanguageType.EN)}
            label="Phone"
            value={""} 
            setValue={() => {}} />
        <DateInput 
          isRequired
          isError={validationResult.hasError('dateOfBirth')}
          errorMessage={validationResult.getMessageByLanguage('dateOfBirth', LanguageType.EN)}
          label="Date of birth"
          value={""} 
          setValue={() => {}} />

          <InfoWithIcon
              Icon={AlertIcon}
              textColor={Color.BLUE}
              align='flex-start'
              font='body'
          >
            Fill all fields with * to continue.
            <br/>
            After clicking «Submit», it will be impossible to change your personal information
        </InfoWithIcon>

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