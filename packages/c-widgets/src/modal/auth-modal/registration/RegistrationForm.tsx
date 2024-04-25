'use client';
import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components';
import { RegistrationContext } from './RegistrationContext';
import {
  Breakpoint,
  Button,
  Checkbox,
  Color,
  IconPosition,
  Input,
  LinkButton,
  mediaBreakpointDown,
  PasswordInput, PhoneNumberInput, Text,
  typography
} from '@freelbee/shared/ui-kit';
import { ReactComponent as ArrIcon } from '@freelbee/assets/icons/arrow-icons/long_arrow.svg';
import { ValidatorResult } from '@freelbee/features';
import { RegistrationData } from '@freelbee/entities';
import { RegistrationDataValidator } from './util/RegistrationDataValidator';
import { LanguageType } from '@freelbee/shared/language';
import { RegistrationSteps } from './RegistrationSteps';
import { RegistrationDto } from '@freelbee/entities';

type Props = {
  registerUser: (dto: RegistrationDto) => Promise<void>;
};

export default function RegistrationForm(props: Props) {
  const { registerUser } = props;

  const { registrationData, setRegistrationData, setStep } = useContext(RegistrationContext);
  const [loading, setLoading] = useState(false);
  const [validatorResult, setValidatorResult] = useState(new ValidatorResult<RegistrationData>());

  const validator = new RegistrationDataValidator();

  const sendForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formValidatorResult = validator.validate(registrationData);

    if (registrationData.password !== registrationData.repeatPassword) {
      formValidatorResult.setError(`repeatPassword`, { en: `Passwords don't match` });
    }

    setValidatorResult(formValidatorResult);

    if (!formValidatorResult.isSuccess()) return;

    setLoading(true);

    const body = {
      email: registrationData.email,
      password: registrationData.password,
      phone: registrationData.phone
    };
    registerUser(body)
      .then(() => setStep(RegistrationSteps.CONFIRM_EMAIL))
      .finally(() => setLoading(false));
  };

  const handleInput = (value: string, field: string) => {
    setRegistrationData(prevState => ({
      ...prevState, [field]: value
    }));
  };

  const toggleAgreement = () => {
    setRegistrationData(prevState => ({
      ...prevState, agreeWithTerms: !prevState.agreeWithTerms
    }));
  };

  return (
    <Content>
      <Form onSubmit={sendForm}>
        <PersonalInfo>
          <Heading>
            <Title>
              Personal information
            </Title>
            <Text
              font={'captions'}
              color={Color.GRAY_600}
            >
              * – required field
            </Text>
          </Heading>
          <Fields>
            <Input
              name={'email'}
              label={'E-mail'}
              isRequired
              placeholder={'E-mail'}
              value={registrationData.email ?? ``}
              setValue={(v) => {
                handleInput(v, 'email');
              }}
              isError={validatorResult.hasError('email') /*|| !!errorResponse?.getErrorTranslationByField('email', language)*/}
              errorMessage={validatorResult.getMessageByLanguage('email', LanguageType.EN) /*|| errorResponse?.getErrorTranslationByField('email', language)*/}
            />
            <PhoneNumberInput
              isRequired
              isError={validatorResult.hasError('phone')}
              errorMessage={validatorResult.getMessageByLanguage('phone', LanguageType.EN)}
              label="Phone"
              value={registrationData.phone ?? ''}
              setValue={(v) => {
                handleInput(v, 'phone');
              }} />
          </Fields>
          <Fields>
            <PasswordInput
              name="password"
              label="Password"
              isRequired
              placeholder="Create a password"
              value={registrationData.password}
              setValue={(v) => {
                handleInput(v, 'password');
              }}
              isError={validatorResult.hasError('password')}
              errorMessage={validatorResult.getMessageByLanguage('password', LanguageType.EN)}
            />
            <PasswordInput
              name="repeatPassword"
              label="Confirm your password"
              isRequired
              placeholder="Create a password"
              value={registrationData.repeatPassword}
              setValue={(v) => {
                handleInput(v, 'repeatPassword');
              }}
              isError={validatorResult.hasError('repeatPassword')}
              errorMessage={validatorResult.getMessageByLanguage('repeatPassword', LanguageType.EN)}
            />
          </Fields>
        </PersonalInfo>
        <AgreementsAndButtonContainer>
          <Agreements>
            <CheckboxContainer>
              <Checkbox
                isCheck={registrationData.agreeWithTerms}
                onChange={toggleAgreement}
                isError={validatorResult.hasError('agreeWithTerms')}
              />
            </CheckboxContainer>
            <Statement>
              <Text
                font="body"
                color={Color.GRAY_600}
                as="p">
                I agree with{' '}
                <LinkButton
                  tabIndex={-1} as="Link"
                            href={`https://freelbee-docs.s3.eu-north-1.amazonaws.com/General+Terms+and+Conditions+Freelbee+Service.pdf`}
                            target={`_blank`}>
                  the General Terms and Conditions.
                </LinkButton>

                {' '}I agree with{' '}
                <LinkButton
                  tabIndex={-1}
                  as="Link" href={`https://freelbee-docs.s3.eu-north-1.amazonaws.com/Privacy+Policy.pdf`}
                            target={`_blank`}>
                  the terms of Privacy Policy
                </LinkButton>
                {' '}and{' '}
                <LinkButton
                  tabIndex={-1}
                  as="Link" href={`https://freelbee-docs.s3.eu-north-1.amazonaws.com/AML_KYC+Policy.pdf`}
                            target={`_blank`}>
                  KYC & AML Policy
                </LinkButton>
                .
              </Text>
            </Statement>
          </Agreements>
          <ButtonContainer>
            <Button
              styles={buttonStyles}
              type="submit"
              isLoading={loading}
              disabled={loading || !registrationData.email || !registrationData.password || !registrationData.repeatPassword || !registrationData.phone || !registrationData.agreeWithTerms}
              Icon={<ArrIcon />}
              iconPosition={IconPosition.RIGHT}>
              Next
            </Button>
          </ButtonContainer>
        </AgreementsAndButtonContainer>
      </Form>
    </Content>
  );
}

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  max-width: 496px;
  max-height: 610px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    justify-content: flex-start;
    gap: 32px;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${typography.heading1};
  color: ${Color.GRAY_900};
`;


const PersonalInfo = styled.div<{ withPadding?: boolean }>`
  width: 100%;
  display: grid;
  grid-auto-rows: max-content;
  grid-gap: 16px;
  padding-top: ${({ withPadding }) => withPadding && '32px'};
`;

const Fields = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;

  ${mediaBreakpointDown(Breakpoint.xTablet)} {
    grid-template-columns: unset;
    grid-template-rows: max-content max-content;
    width: 240px;
  }
`;

const AgreementsAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Agreements = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const CheckboxContainer = styled.div`
  margin: 3px;
`;

const Statement = styled.div`
  ${typography.body};
  color: ${Color.GRAY_600};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
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
