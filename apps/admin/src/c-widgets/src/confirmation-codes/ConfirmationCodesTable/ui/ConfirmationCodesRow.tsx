'use client';

import styled from 'styled-components';
import { Breakpoint, Color, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { ConfirmationCode, ConfirmationCodeType } from '@freelbee/entities';

interface Props {
  confirmationCode: ConfirmationCode;
}

export const ConfirmationCodesRow = (props: Props) => {
  const { confirmationCode } = props;

  const extractContactMethod = (code: ConfirmationCode) => {
    const purpose = {
      [ConfirmationCodeType.EMAIL_REGISTRATION_CONFIRMATION]: 'email',
      [ConfirmationCodeType.EMAIL_AUTHENTICATION_CONFIRMATION]: 'email'
    };
    return purpose[code.type];
  };

  const extractEmail = (code: ConfirmationCode) => code.id.split('_')[0];

  const extractPurpose = (code: ConfirmationCode) => {
    const purpose = {
      [ConfirmationCodeType.EMAIL_REGISTRATION_CONFIRMATION]: 'registration',
      [ConfirmationCodeType.EMAIL_AUTHENTICATION_CONFIRMATION]: 'authentication'
    };
    return purpose[code.type];
  };

  return (
    <Container>
      <Text font="bodySmall">{extractContactMethod(confirmationCode)}</Text>
      <Text font="bodySmall">{extractEmail(confirmationCode)}</Text>
      <Text font="bodySmall">{extractPurpose(confirmationCode)}</Text>
      <Text font="bodySmall">{confirmationCode.value}</Text>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr 0.8fr 0.5fr;
  align-items: center;
  padding: 16px;
  gap: 16px;

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    gap: 8px;
    grid-template-columns: 0.8fr 1.2fr;
    border: 1px solid ${Color.GRAY_400};
    border-radius: 16px;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
`;
