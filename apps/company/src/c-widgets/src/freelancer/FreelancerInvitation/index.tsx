'use client';

import {
  BORDER_RADIUS,
  Breakpoint,
  Button,
  ButtonStyleEnum,
  CloseBtnSize,
  CloseButton,
  Color,
  Input,
  mediaBreakpointDown,
  ModalWindow,
  Text
} from "@freelbee/shared/ui-kit";
import {useAppSelector} from "@company/features";
import {useDispatch} from "react-redux";
import {
  FreelancerInvitationDto,
  setFreelancerInvitationModalOpened,
  useGetCompanyCounterpartyQuery,
  useInviteFreelancerMutation
} from "@company/entities";
import styled, {css} from "styled-components";
import React, {useState} from "react";
import {ValidatorResult} from "@freelbee/features";
import {InvitationValidator} from "./util/InvitationValidator";
import {LanguageType} from "@freelbee/shared/language";

export const FreelancerInvitationModal = () => {
  const { data: company } = useGetCompanyCounterpartyQuery();
  const [inviteFreelancer] = useInviteFreelancerMutation();
  const [validatorResult, setValidatorResult] = useState(new ValidatorResult<FreelancerInvitationDto>());
  const [buttonLoading, setButtonLoading] = useState(false);
  const dispatch = useDispatch();
  const isOpen = useAppSelector(state => state.freelancerInvitationReducer.freelancerInvitationModalOpened);
  const [email, setEmail] = useState<string>('');
  const validator = new InvitationValidator();
  const onClose = () => dispatch(setFreelancerInvitationModalOpened(false));
  const handleChange = (value: string) => {
    setEmail(prevState => value)
  }


  const sendInvitation = async () => {
    const body: FreelancerInvitationDto = {
      freelancerEmail: email,
      companyCounterpartyId: company?.id
    };
    const formValidatorResult = validator.validate(body);
    setValidatorResult(formValidatorResult);
    if (!formValidatorResult.isSuccess()) return;
    setButtonLoading(true);
    inviteFreelancer(body).unwrap()
      .then(() => {
        handleChange('');
        onClose();})
      .catch(()=>{})
      .finally(() => setButtonLoading(false));
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose}>
      <Container>
        <CloseButton clickHandler={onClose} size={CloseBtnSize.XS} styles={closeBtnStyle}/>
        <Text font={"heading1"}>Add freelancer</Text>
        <Text font={'body'}>Enter the email address of the freelancer you want to send an onboarding link to</Text>
        <Input
          label={'E-mail'}
          placeholder={'hello@mail.com'}
          value={email}
          setValue={value => handleChange(value)}
          isError={validatorResult.hasError('freelancerEmail')}
          errorMessage={validatorResult.getMessageByLanguage('freelancerEmail', LanguageType.EN)}/>
        <Button
          styles={sendBtnStyle}
          styleType={ButtonStyleEnum.GREEN}
          onClick={sendInvitation}
          isLoading={buttonLoading}
        >Send invitation</Button>
      </Container>
    </ModalWindow>
  )
}

const Container = styled.div`
  position: relative;
  min-width: 540px;
  min-height: 328px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: ${BORDER_RADIUS.L};
  background-color: ${Color.WHITE};

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    min-width: 515px;
    min-height: 286px;
    padding: 24px;
    gap: 24px;
    border-radius: ${BORDER_RADIUS.M};
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 16px;
    gap: 16px;
    width: 100%;
    min-width: 335px;
    min-height: 243px;
    border-radius: ${BORDER_RADIUS.M};
  }
`;

const closeBtnStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const sendBtnStyle = css`
    width: 100%;
`;
