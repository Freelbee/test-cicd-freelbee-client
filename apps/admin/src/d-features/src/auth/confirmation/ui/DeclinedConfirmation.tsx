import React from 'react';
import styled from 'styled-components';
import { CanceledIcon } from './CanceledIcon';
import { Paragraph } from '@admin/shared';
import { ColorType } from '@admin/shared';

type Props = {
  sendConfirmation: () => void
}

export function DeclinedConfirmation(props: Props) {
  const { sendConfirmation } = props;

  return (
    <Container>
      <Holder>
        <CanceledIcon className={`declinedConfirmation__icon`} />
      </Holder>
      <Paragraph color={ColorType.GREY_COLOR}>
        Authorization request rejected
      </Paragraph>
      <SendConfirmationHolder onClick={() => sendConfirmation()}>
        <Paragraph color={ColorType.LINK}>Send new confirmation</Paragraph>
      </SendConfirmationHolder>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 15px;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SendConfirmationHolder = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 15px;
  padding-top: 15px;
`;
