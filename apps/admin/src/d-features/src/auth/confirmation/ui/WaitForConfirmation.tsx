import React from 'react';
import styled from 'styled-components';
import * as process from 'process';
import { ColorType } from '@admin/shared';
import { useGetSessionDataQuery } from '@admin/entities';
import { Button, Heading1, Text } from '@freelbee/shared/ui-kit';

export function WaitForConfirmation() {
  const { refetch, isFetching } = useGetSessionDataQuery();

  return (
    <Container>
      <Heading1>Sign In Confirmation</Heading1>
      <Text color={ColorType.GREY_COLOR}>
        Accept authorization in your Telegram account: &nbsp;
        <a href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminBot1'}`} target={`_blank`}>
          <Text color={ColorType.LINK}>@{process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminBot1'}</Text>
        </a>
        &nbsp;and click the button
      </Text>
      <Button onClick={() => refetch()} isLoading={isFetching} isWide>
        Check status
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 32px;
`;
