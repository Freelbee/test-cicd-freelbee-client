'use client';

import {  PasswordUpdateDto } from "@freelbee/entities";
import { ValidatorResult } from "@freelbee/features";
import { Button, PasswordInput} from "@freelbee/shared/ui-kit";
import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { FormEventHandler, HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { PasswordUpdateValidator } from "../../util/PasswordUpdateValidator";
import { LanguageType } from "@freelbee/shared/language";
interface Props extends HTMLAttributes<HTMLFormElement> {
  handlePasswordUpdate: (dto: PasswordUpdateDto) => Promise<void>;
}

export const PasswordUpdateForm = ({handlePasswordUpdate, ...rest}: Props) => {

  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [validationResult, setValidationResult] = useState(new ValidatorResult<PasswordUpdateDto>());
  const validator = new PasswordUpdateValidator();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkPasswordsValid = (): boolean => {
    const validationResult = validator.validate({
      oldPassword, 
      newPassword
    });

    setValidationResult(validationResult);
    return validationResult.isSuccess();
  }

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if(!checkPasswordsValid()) return;
    setIsLoading(true);
    handlePasswordUpdate({oldPassword, newPassword})
    .then(() => setIsSuccess(true))
    .catch((e) => console.log(e))
    .finally(() => setIsLoading(false));
  }

  const resetErrors = () => {
    setValidationResult(new ValidatorResult<PasswordUpdateDto>());
  }

  return (
    <FormContainer {...rest} onSubmit={submitHandler}>
      <PasswordInput 
          label="Old password"
          value={oldPassword} 
          onFocus={resetErrors}
          isError={validationResult.hasError('oldPassword')}
          errorMessage={validationResult.getMessageByLanguage('oldPassword', LanguageType.EN)}
          setValue={(password) => setOldPassword(password)} />
      <PasswordInput
          label="New password"
          value={newPassword} 
          onFocus={resetErrors}
          isError={validationResult.hasError('newPassword')}
          errorMessage={validationResult.getMessageByLanguage('newPassword', LanguageType.EN)}
          setValue={(password) => setNewPassword(password)} />           

      <Button 
        disabled={!oldPassword || !newPassword}
        isLoading={isLoading}
        type='submit' 
        isSuccess={isSuccess}
        wideOnBreakPoint={Breakpoint.xMobile}
        >Change password</Button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: grid;
  row-gap: 24px;
  column-gap: 16px;
  grid-template-columns: 1fr 1fr;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;