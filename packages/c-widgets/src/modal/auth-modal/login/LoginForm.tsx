'use client'
import React, {useContext, useState} from 'react';
import styled, {css} from 'styled-components';
import {
  Breakpoint,
  Button,
  Color,
  IconPosition,
  Input,
  LinkButton,
  mediaBreakpointDown,
  mediaBreakpointUp,
  PasswordInput,
  typography
} from "@freelbee/shared/ui-kit";
import {LoginContext} from "./LoginContext";
import {ReactComponent as ArrIcon} from "@freelbee/assets/icons/arrow-icons/long_arrow.svg";
import {LoginDataValidator} from "./util/LoginDataValidator";
import {ValidatorResult} from "@freelbee/features";
import {AuthDto} from "@freelbee/entities";
import {LoginSteps} from "./LoginSteps";

type Props = {
  authUser: (AuthDto) => void;
};

export default function LoginForm(props: Props) {

  const {authUser} = props;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [validatorResult, setValidatorResult] = useState(new ValidatorResult<AuthDto>());
  const {loginData, setLoginData, setStep} = useContext(LoginContext);


  const validator = new LoginDataValidator();

  const sendForm = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const formValidatorResult = validator.validate(loginData);
    setValidatorResult(formValidatorResult);

    if (!formValidatorResult.isSuccess()) return;

    setButtonLoading(true);

    authUser(loginData).unwrap()
      .then(() => {
        setStep(LoginSteps.CHECK_CODE);
      })
      .finally(() => setButtonLoading(false));
  };

  const handleInput = (value, field) => {
    setLoginData(prevState => ({
      ...prevState, [field]: value
    }));
  }

  return (
    <Content>
      <Form onSubmit={sendForm}>
        <ToSignUpTextForMobile>
          <Heading>
            <Title>
              Log in
            </Title>
            <Text>
              {'Don’t have an account? '}
            </Text>
          </Heading>
          <LinkButton
            as='button'
            type='button'
            onClick={() => {
              console.log('go to the registration')
              /*router.push(router.asPath.replace('sign-in', 'sign-up'));
              setAuthModalState(AuthModalState.Register);*/
            }}>
            Sign up
          </LinkButton>
        </ToSignUpTextForMobile>
        <Fields>
          {/*{(validatorResult.hasError('email') || validatorResult.hasError('password')) && (
                        <ErrorMessage>
                            {validatorResult.getMessageByLanguage('email', language) === ''
                                ? validatorResult.getMessageByLanguage('password', language)
                                : validatorResult.getMessageByLanguage('email', language)}

                        </ErrorMessage>
                    )}*/}
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
              // isError={validatorResult.hasError('password')}
            />
            <ButtonContainer>
              <MapButtonSwitchAuth
                onClick={() => {
                  console.log('go to password recovery')
                  /*router.push(router.asPath.replace('sign-in', 'password-reset'));
                  setAuthModalState(AuthModalState.Recover);*/
                }}>
                Forgot password?
              </MapButtonSwitchAuth>
            </ButtonContainer>
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

const ToSignUpTextForMobile = styled.div`
  ${mediaBreakpointUp(Breakpoint.xMobile)} {
    display: none;
  }
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${typography.heading1};
  color: ${Color.GRAY_900};
`;

const Text = styled.div`
  ${typography.body};
  color: ${Color.GRAY_900};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const MapButtonSwitchAuth = styled.div`
  ${typography.body};
  color: ${Color.GRAY_500};

  cursor: pointer;
`;

const ErrorMessage = styled.div`
  ${typography.body};
  color: ${Color.DANGER};
`;
