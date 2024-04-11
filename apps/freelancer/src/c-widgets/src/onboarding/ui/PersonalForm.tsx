'use client';

import { Button, ButtonStyleEnum, Color, DateInput, InfoWithIcon, Input, PhoneNumberInput } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { ValidatorResult } from "@freelbee/features";
import { FormData } from "../interface/FormData";
import { PersonalFormValidator } from "../util/PersonalFormValidator";
import { LanguageType } from "@freelbee/shared/language";
import { UserDataPropsType } from "@freelbee/entities";
import { Onboarding_Step } from "../interface/OnboardingStep";

export const PersonalForm = () => {
  
  const {setStep, setOpen, formData, setFormData} = useContext(OnboardingContext);
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

      setOpen(false);
  }

  return (
    <Form onSubmit={submitHandler}>
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.FIRST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.FIRST_NAME, LanguageType.EN)}
            label="Name"
            placeholder={"John"} 
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={formData.FIRST_NAME} 
            setValue={(v) => setFormData(UserDataPropsType.FIRST_NAME, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.LAST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.LAST_NAME, LanguageType.EN)}
            label="Surname"
            placeholder="Silver" 
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={formData.LAST_NAME} 
            setValue={(v) => setFormData(UserDataPropsType.LAST_NAME, v)} />
        <PhoneNumberInput 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.PHONE_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.PHONE_NUMBER, LanguageType.EN)}
            label="Phone"
            value={formData.PHONE_NUMBER} 
            setValue={(v) => setFormData(UserDataPropsType.PHONE_NUMBER, v)} />
        <DateInput 
          isRequired
          isError={validationResult.hasError(UserDataPropsType.BIRTH_DATE)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.BIRTH_DATE, LanguageType.EN)}
          label="Date of birth"
          value={formData.BIRTH_DATE} 
          setValue={(v) => setFormData(UserDataPropsType.BIRTH_DATE, v)} />

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