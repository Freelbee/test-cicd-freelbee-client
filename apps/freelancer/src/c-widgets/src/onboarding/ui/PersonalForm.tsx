'use client';

import {
  Button,
  ButtonStyleEnum,
  Color,
  DateInput,
  InfoWithIcon,
  Input,
  SelectWithSearch, Text
} from '@freelbee/shared/ui-kit';
import React, { FormEventHandler, useContext, useState } from "react";
import styled from "styled-components";
import { OnboardingContext } from "../context/OnboardingContext";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { ValidatorResult } from "@freelbee/features";
import { FormData } from "../interface/FormData";
import { PersonalFormValidator } from "../util/PersonalFormValidator";
import { LanguageType } from "@freelbee/shared/language";
import { UserDataPropsType, UserDataType } from '@freelbee/entities';
import { Onboarding_Step } from "../interface/OnboardingStep";
import { setOnboardingOpened, useGetUserQuery, useSaveUserDataMutation } from "@freelancer/entities";
import { PropsHelper } from "@freelbee/shared/helpers";
import { useDispatch } from "react-redux";
import countries from "i18n-iso-countries";


const documentTypes: { [key in UserDataType]: string } = {
  [UserDataType.PASSPORT]: 'Passport',
  [UserDataType.DRIVER_LICENSE]: 'Driver license',
}
const documentTypesArray = [UserDataType.PASSPORT, UserDataType.DRIVER_LICENSE];

export const PersonalForm = () => {

  const {setStep, formData, setFormData} = useContext(OnboardingContext);
  const [validationResult, setValidationResult] = useState(new ValidatorResult<FormData>());
  const validator = new PersonalFormValidator();
  const [saveUserData, {isLoading}] = useSaveUserDataMutation();
  const { refetch } = useGetUserQuery();
  const dispatch = useDispatch();

  const [documentType, setDocumentType] = useState<UserDataType>(UserDataType.PASSPORT);

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const validationResult = validator.validate(formData);
      setValidationResult(validationResult);

      if(!validationResult.isSuccess()) {
          return;
      }

      formData.COUNTRY = countries.getAlpha2Code(formData.COUNTRY!, "en");
      saveUserData({
        type: documentType,
        props: PropsHelper.MapFieldsToProps(formData)
      }).unwrap()
      .then(() => {
        dispatch(setOnboardingOpened(false));
        refetch();
      });
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
          value={formData?.DOCUMENT_NUMBER ?? ''}
          setValue={(v) => setFormData(UserDataPropsType.DOCUMENT_NUMBER, v)} />
        <Input
          isRequired
          isError={validationResult.hasError(UserDataPropsType.TIN)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.TIN, LanguageType.EN)}
          label="TIN"
          placeholder="Enter the TIN"
          value={formData?.TIN ?? ''}
          setValue={(v) => setFormData(UserDataPropsType.TIN, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(UserDataPropsType.FIRST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.FIRST_NAME, LanguageType.EN)}
            label="Name"
            placeholder={"John"}
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={formData?.FIRST_NAME ?? ''}
            setValue={(v) => setFormData(UserDataPropsType.FIRST_NAME, v)} />
        <Input
            isRequired
            isError={validationResult.hasError(UserDataPropsType.LAST_NAME)}
            errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.LAST_NAME, LanguageType.EN)}
            label="Surname"
            placeholder="Silver"
            tipsText='Will be displayed in your profile and visible to freelancers'
            value={formData?.LAST_NAME ?? ''}
            setValue={(v) => setFormData(UserDataPropsType.LAST_NAME, v)} />
        <DateInput
          isRequired
          isError={validationResult.hasError(UserDataPropsType.BIRTH_DATE)}
          errorMessage={validationResult.getMessageByLanguage(UserDataPropsType.BIRTH_DATE, LanguageType.EN)}
          label="Date of birth"
          value={formData?.BIRTH_DATE ?? ''}
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
            isLoading={isLoading}
            isWide
            styleType={ButtonStyleEnum.GREEN}
            type='submit'>Submit</Button>
          <Button
            type='button'
            onClick={() => setStep(Onboarding_Step.ADDRESS)}
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
