'use client';

import { Button, Color, DateInput, InfoWithIcon, Input, PhoneNumberInput } from "@freelbee/shared/ui-kit";
import { FormEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import { Onboarding_Step } from "../interface/OnboardingStep";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { ValidatorResult } from "@freelbee/features";
import { PersonalFormValidator } from "../util/PersonalFormValidator";
import { LanguageType } from "@freelbee/shared/language";
import { PersonalFormData } from "../interface/PersonalFormData";
import { useDataStateUpdater } from "@freelbee/shared/hooks";
import { UserDataPropsType, UserDataType } from "@freelbee/entities";
import { useSaveUserDataMutation } from "@company/entities";
import { PropsHelper } from "@freelbee/shared/helpers";

const initialData = {
    [UserDataPropsType.FIRST_NAME]: "",
    [UserDataPropsType.LAST_NAME]: "",
    [UserDataPropsType.PHONE_NUMBER]: "",
    [UserDataPropsType.BIRTH_DATE]: "",
    [UserDataPropsType.STREET]: "",
    [UserDataPropsType.COUNTRY]: "",
    [UserDataPropsType.CITY]: "",
    [UserDataPropsType.POSTAL_CODE]: "",
    [UserDataPropsType.HOUSE_NUMBER]: ""
}

export const PersonalForm = () => {
  
  const {setStep} = useContext(OnboardingContext);
  const [saveUserData, {isLoading}] = useSaveUserDataMutation();
  const [validationResult, setValidationResult] = useState(new ValidatorResult<PersonalFormData>());
  const validator = new PersonalFormValidator();

  const [data, setData] = useDataStateUpdater<PersonalFormData>(initialData);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validationResult = validator.validate(data);
    setValidationResult(validationResult);

    if(!validationResult.isSuccess()) {
        return;
    }

    saveUserData({
        type: UserDataType.DEFAULT,
        props: PropsHelper.MapFieldsToProps(data)
    }).unwrap()
    .then(() => setStep(Onboarding_Step.COMPANY_DATA));
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
            value={data.FIRST_NAME} 
            setValue={(v) => setData(UserDataPropsType.FIRST_NAME, v)} />
        <Input 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.LAST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.LAST_NAME, LanguageType.EN)}
            label="Surname"
            placeholder="Silver" 
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={data.LAST_NAME} 
            setValue={(v) => setData(UserDataPropsType.LAST_NAME, v)} />
        <PhoneNumberInput 
            isRequired
            isError={validationResult.hasError(UserDataPropsType.PHONE_NUMBER)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.PHONE_NUMBER, LanguageType.EN)}
            label="Phone"
            value={data.PHONE_NUMBER} 
            setValue={(v) => setData(UserDataPropsType.PHONE_NUMBER, v)} />
        <DateInput 
          isRequired
          isError={validationResult.hasError(UserDataPropsType.BIRTH_DATE)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.BIRTH_DATE, LanguageType.EN)}
          label="Date of birth"
          value={data.BIRTH_DATE} 
          setValue={(v) => setData(UserDataPropsType.BIRTH_DATE, v)} />

          <InfoWithIcon
              Icon={AlertIcon}
              textColor={Color.BLUE}
              align='flex-start'
              font='body'
          >
            Fill all fields with * to continue.
        </InfoWithIcon>

        <ButtonsContainer>
          <Button 
            isLoading={isLoading}
            type='submit'
            isWide>Next</Button>  
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