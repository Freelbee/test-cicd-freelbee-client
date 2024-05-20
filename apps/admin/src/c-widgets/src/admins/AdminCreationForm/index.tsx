'use client';

import styled, { css } from 'styled-components';
import { ColorType } from '@admin/shared';
import { Button, Input, PasswordInput } from '@freelbee/shared/ui-kit';
import React, { FormEvent, useState } from 'react';
import { useSaveNewAdminMutation } from '@admin/entities';

export const AdminCreationForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [saveNewAdmin] = useSaveNewAdminMutation();

  const sendForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      email,
      password,
      roles: []
    };
    saveNewAdmin(body)
      .then((response) => {
        // if (response.isSuccess()) {
          setEmail('');
          setPassword('');
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        // }
      })
      .finally(() => setLoading(false));
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
          type='submit'
          isWide
          isLoading={loading}
          styles={success && css`background-color: ${ColorType.GREEN_COLOR}`}
        >
          {success ? 'Success' : 'Create admin'}
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

