'use client';

import { Button, PasswordInput } from "@freelbee/shared/ui-kit";
import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { FormEventHandler, HTMLAttributes, useState } from "react";
import styled, { css } from "styled-components";

interface Props extends HTMLAttributes<HTMLFormElement> {
  handler: (data: {newPassword: string, oldPassword: string}) => void;
}

export const PasswordChangeForm = ({handler, ...rest}: Props) => {

  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    
    handler({oldPassword, newPassword});
  }

  return (
    <FormContainer {...rest} onSubmit={submitHandler}>
      <PasswordInput 
          label="Old password"
          value={oldPassword} 
          setValue={(password) => setOldPassword(password)} />
      <PasswordInput
          label="New password"
          value={newPassword} 
          setValue={(password) => setNewPassword(password)} />

      <Button 
        disabled={!oldPassword || !newPassword}
        isWide 
        type='submit' 
        styles={btnStyles}>Change password</Button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 24px;
  column-gap: 16px;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-template-columns: 1fr;
    row-gap: 16px;
  }
`;

const btnStyles = css`
  grid-column: span 2;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    grid-column: unset;
  }
`