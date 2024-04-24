'use client';

import {
  Button,
  Color,
  DateInput,
  InfoWithIcon,
  Input,
  SelectWithSearch, Text
} from '@freelbee/shared/ui-kit';
import React, { FormEventHandler, useContext, useState } from "react";
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
    [UserDataPropsType.BIRTH_DATE]: "",
    [UserDataPropsType.DOCUMENT_NUMBER]: "",

}

const documentTypes: { [key in UserDataType]: string } = {
    [UserDataType.PASSPORT]: 'Passport',
    [UserDataType.DRIVER_LICENSE]: 'Driver license',
}

const documentTypesArray = [UserDataType.PASSPORT, UserDataType.DRIVER_LICENSE];

export const PersonalForm = () => {

  const {setStep} = useContext(OnboardingContext);
  const [saveUserData, {isLoading}] = useSaveUserDataMutation();
  const [validationResult, setValidationResult] = useState(new ValidatorResult<PersonalFormData>());
  const validator = new PersonalFormValidator();

  const [documentType, setDocumentType] = useState<UserDataType>(UserDataType.PASSPORT);
  const [data, setData] = useDataStateUpdater<PersonalFormData>(initialData);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const validationResult = validator.validate(data);
    setValidationResult(validationResult);

    if(!validationResult.isSuccess()) {
        return;
    }
    saveUserData({
        type: documentType,
        props: PropsHelper.MapFieldsToProps(data)
    }).unwrap()
    .then(() => setStep(Onboarding_Step.COMPANY_DATA))
    .catch(e => {})
  }

  return (
    <Form onSubmit={submitHandler}>
        <SelectWithSearch<UserDataType>
          label='Document type'
          placeholder=''
          items={documentTypesArray}
          value={documentType}
          setValue={(item) => {
            setDocumentType(item);
          }}
          renderOption={(item) => (<Text font="body">{documentTypes[item]}</Text>)}
          getStringValue={value => documentTypes[value]}
          hideSearch
        />
        <Input
          isRequired
          isError={validationResult.hasError(UserDataPropsType.DOCUMENT_NUMBER)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.DOCUMENT_NUMBER, LanguageType.EN)}
          label="Document number"
          placeholder={"1234567890"}
          value={data?.DOCUMENT_NUMBER ?? ''}
          setValue={(v) => setData(UserDataPropsType.DOCUMENT_NUMBER, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(UserDataPropsType.FIRST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.FIRST_NAME, LanguageType.EN)}
            label="Name"
            placeholder={"John"}
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={data?.FIRST_NAME ?? ''}
            setValue={(v) => setData(UserDataPropsType.FIRST_NAME, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(UserDataPropsType.LAST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.LAST_NAME, LanguageType.EN)}
            label="Surname"
            placeholder="Silver"
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={data?.LAST_NAME ?? ''}
            setValue={(v) => setData(UserDataPropsType.LAST_NAME, v)} />
        <DateInput
          isRequired
          isError={validationResult.hasError(UserDataPropsType.BIRTH_DATE)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.BIRTH_DATE, LanguageType.EN)}
          label="Date of birth"
          value={data?.BIRTH_DATE ?? ''}
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
