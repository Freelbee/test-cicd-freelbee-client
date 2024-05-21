'use client';

import styled, { css } from 'styled-components';
import { ColorType } from '@admin/shared';
import { Button, Input, PasswordInput } from '@freelbee/shared/ui-kit';
import React, { FormEvent, useState } from 'react';
import { useCreateAdminUserMutation } from '@admin/entities';

export const AdminCreationForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessButton, setSuccessButton] = useState(false);

  const [createAdminUser, { isLoading, isSuccess }] = useCreateAdminUserMutation();

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAdminUser({ email, password, roles: [] })
      .then(() => {
        if (isSuccess) {
          setEmail('');
          setPassword('');
          setSuccessButton(true);
          setTimeout(() => {
            setSuccessButton(false);
          }, 3000);
        }
      })
  };

  return (
    <FormContent>
      <Form onSubmit={(e) => sendForm(e)}>
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={email}
          setValue={(value) => setEmail(value)}
        />
        <PasswordInput
          label="Password"
          value={password}
          setValue={(value) => setPassword(value)}
        />
        <Button
          type="submit"
          isWide
          isLoading={isLoading}
          styles={isSuccessButton && css`background-color: ${ColorType.GREEN_COLOR}`}
        >
          {isSuccessButton ? 'Success' : 'Create admin'}
        </Button>
      </Form>
    </FormContent>
  );
};

const FormContent = styled.div`
  display: flex;
  gap: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  width: 100%;
`;

