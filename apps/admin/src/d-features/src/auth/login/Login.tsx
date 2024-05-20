'use client';

import React, { FormEvent, useState } from 'react';
import { useSignInMutation } from '@admin/entities';
import styled from 'styled-components';
import { useDataStateUpdater } from '@freelbee/shared/hooks';
import { Button, Heading1, Input, PasswordInput } from '@freelbee/shared/ui-kit';
import { AuthDto } from '@freelbee/entities';
import { ValidatorResult } from '@freelbee/features';
import { LanguageType } from '@freelbee/shared/language';
import { LoginDataValidator } from 'apps/admin/src/c-widgets/src/auth/util/LoginDataValidator';

export function Login() {

  const [loginData, setLoginData] = useState<AuthDto>({ email: '', password: '' });
  const [, setData] = useDataStateUpdater<AuthDto>(loginData, setLoginData);

  const [login, { isLoading: isLoadingLogin }] = useSignInMutation();

  const [validatorResult, setValidatorResult] = useState(new ValidatorResult<AuthDto>());
  const validator = new LoginDataValidator();

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const formValidatorResult = validator.validate(loginData);
    setValidatorResult(formValidatorResult);

    if (!validatorResult.isSuccess()) return;

    login(loginData);
  };

  return (
    <Container>
      <ContainerBody>
        <Heading1>Sign In</Heading1>
        <Form onSubmit={onSubmit}>
          <Input
            isRequired
            label="E-mail address"
            placeholder="Enter e-mail address"
            value={loginData.email}
            setValue={(value) => setData('email', value)}
            isError={validatorResult.hasError('email')}
            errorMessage={validatorResult.getMessageByLanguage('email', LanguageType.EN)}
          />
          <PasswordInput
            isRequired
            label="Password"
            placeholder="Enter password"
            value={loginData.password}
            setValue={(value) => setData('password', value)}
            isError={validatorResult.hasError('password')}
            errorMessage={validatorResult.getMessageByLanguage('password', LanguageType.EN)}
          />
          <Button
            type='submit'
            isWide
            isLoading={isLoadingLogin}
          >
            Submit
          </Button>
        </Form>
      </ContainerBody>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
  justify-content: center;
`;

const ContainerBody = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  font-weight: 600;
  font-size: 22px;
`;
