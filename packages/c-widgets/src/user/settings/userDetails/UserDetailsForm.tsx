'use client';

import { User } from "@freelbee/entities";
import { Input } from "@freelbee/features/common";
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { FormEventHandler } from "react";
import {ReactComponent as CopyIcon} from '@freelbee/assets/icons/copy/copy.svg';
import styled from "styled-components";

interface Props {
  // To-Do Interface
  user: User;
}

export const UserDetailsForm = ({user}: Props) => {

  const submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  }

  const copyID = () => {
    if(!user) return;
    window.navigator.clipboard.writeText(`${user.id}`);
};

  return (
    <Container onSubmit={submitHandler}>
      <InputRow>
        <Input 
          disabled
          label="Name" 
          placeholder={""} 
          value={user.firstname} 
          setValue={() => {}} />
        <Input 
          disabled
          label="Surname" 
          placeholder={""} 
          value={user.lastname} 
          setValue={() => {}} />      
      </InputRow>

      <CopyContainer>
        <Input 
          disabled
          label="ID" 
          placeholder={""} 
          value={user.id.toString()} 
          setValue={() => {}} />    
        
        <CopyButton 
          onClick={copyID}
          aria-label='Copy user id'>
            <CopyIcon />
        </CopyButton>
      </CopyContainer>

      <Input 
        disabled
        label="Phone" 
        placeholder={""} 
        value={user.phone} 
        setValue={() => {}} />
        <InputContainer>
          <Input 
            disabled
            label="E-mail" 
            placeholder={""} 
            value={user.email} 
            setValue={() => {}} />
          <Text font='bodySmall' color={Color.GRAY_600}>Notifications, support replies and payment documents are sent to this address</Text>
        </InputContainer>

    </Container>
  )
}

const Container = styled.form`
display: flex;
flex-direction: column;
gap: 24px;
padding: 24px 0px;

 ${mediaBreakpointDown(Breakpoint.Tablet)} {
  gap: 16px;
 }
`;

const InputContainer = styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`;

const InputRow = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 16px;

${mediaBreakpointDown(Breakpoint.xMobile)} {
  grid-template-columns: 1fr;
 }
`;

const CopyContainer = styled.div`
  position: relative;
`;

const CopyButton = styled.button`
  cursor: pointer;
  position: absolute;
  height: 80%;
  top: 33%;
  right: 16px;

  svg {
    width: 24px;
    height: 24px;
    stroke: ${Color.GRAY_700};
  }
`;
