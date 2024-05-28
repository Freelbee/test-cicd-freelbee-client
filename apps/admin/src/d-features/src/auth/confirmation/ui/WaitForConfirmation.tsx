import React from 'react';
import styled from 'styled-components';
import * as process from 'process';
import { useGetAuthInfoQuery } from '@admin/entities';
import { Button, Color, Heading1, Text } from '@freelbee/shared/ui-kit';

export function WaitForConfirmation() {
  const { refetch, isFetching } = useGetAuthInfoQuery();

  return (
    <Container>
      <Heading1>Sign In Confirmation</Heading1>
      <Text color={Color.GRAY_600}>
        Accept authorization in your Telegram account: &nbsp;
        <a href={`https://t.me/${process.env.NEXT_PUBLIC_ADMIN_BOT_URL ?? 'FreelbeeAdminTest1Bot'}`} target={`_blank`}>
          <Text color={Color.BLUE}>@{process.env.NEXT_PUBLIC_ADMIN_BOT_URL ?? 'FreelbeeAdminTest1Bot'}</Text>
        </a>
        &nbsp;and click the button
      </Text>
      <Button onClick={() => refetch()} isLoading={isFetching} isWide>Check status</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 32px;
`;
