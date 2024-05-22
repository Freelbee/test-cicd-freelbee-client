'use client'

import React, {useContext, useState} from 'react';
import styled, {css} from 'styled-components';
import {
  Breakpoint,
  Button,
  IconPosition,
  Input,
  mediaBreakpointDown,
  PasswordInput,
} from "@freelbee/shared/ui-kit";
import {LoginContext} from "./LoginContext";
import {ReactComponent as ArrIcon} from "@freelbee/assets/icons/arrow-icons/long_arrow.svg";
import {LoginDataValidator} from "./util/LoginDataValidator";
import {ValidatorResult} from "@freelbee/features";
import {AuthenticationDto} from "@freelbee/entities";
import {LoginSteps} from "./LoginSteps";

type Props = {
  authUser: (dto: AuthenticationDto) => Promise<void>;
};

export default function LoginForm(props: Props) {

  const {authUser} = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validatorResult, setValidatorResult] = useState(new ValidatorResult<AuthenticationDto>());
  const {loginData, setLoginData, setStep} = useContext(LoginContext);


  const validator = new LoginDataValidator();

  const sendForm = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const formValidatorResult = validator.validate(loginData);
    setValidatorResult(formValidatorResult);

    if (!formValidatorResult.isSuccess()) return;

    setButtonLoading(true);

    loginData.email = loginData.email.toLowerCase();
    authUser(loginData).then(() => {
        setStep(LoginSteps.CHECK_CODE);
      })
      .finally(() => setButtonLoading(false));
  };

  const handleInput = (value: string, field: string) => {
    setLoginData(prevState => ({
      ...prevState, [field]: value
    }));
  }

  return (
    <Content>
      <Form onSubmit={sendForm}>
        <Fields>
          <Input
            label={'E-mail'}
            noMessageSpace
            name={'email'}
            placeholder={'E-mail'}
            value={loginData.email ?? ``}
            setValue={(v) => {
              handleInput(v, 'email')
            }}
            isError={validatorResult.hasError('email')}
          />
          <PasswordContainer>
            <PasswordInput
              label={'Password'}
              noMessageSpace
              placeholder={''}
              value={loginData.password}
              name='password'
              setValue={(v) => {
                handleInput(v, 'password')
              }}
              isError={validatorResult.hasError('password')}
            />
          </PasswordContainer>
        </Fields>
        <LoginAction>
          <Button
            styles={buttonStyles}
            type='submit'
            disabled={buttonLoading}
            isLoading={buttonLoading}
            Icon={<ArrIcon/>}
            iconPosition={IconPosition.RIGHT}>
            Next
          </Button>
        </LoginAction>
      </Form>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 32px;
  align-items: flex-start;
  width: 260px;
  transition: .5s;
`;

const Fields = styled.div`
  height: max-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    gap: 24px;
  }
`;

const LoginAction = styled.div`
  display: grid;
  justify-content: center;
`;

const buttonStyles = css`
  width: 260px;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    width: 190px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    width: 156px;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
