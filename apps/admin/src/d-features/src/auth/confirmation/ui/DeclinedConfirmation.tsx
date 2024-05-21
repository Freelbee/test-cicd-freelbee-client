import React from 'react';
import styled from 'styled-components';
import { CanceledIcon } from './CanceledIcon';
import { Text, Color, Button } from '@freelbee/shared/ui-kit';

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
      <Text color={Color.GRAY_600} align='center'>Authorization request rejected</Text>
      <ButtonContainer>
        <Button onClick={() => sendConfirmation()}>Send new confirmation</Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  gap: 15px;
`;

const Holder = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
